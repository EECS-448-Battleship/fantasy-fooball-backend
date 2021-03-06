const { Model } = require('flitter-orm')

/**
 * Model representing a starting lineup/bench configuration for a
 * given team. These will have copies frozen for each week that progresses.
 * @extends Model
 */
class Lineup extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    static get schema() {
        return {
            // Associated team ID
            team_id: String,

            // Array of player IDs on the team on the bench
            benched_player_ids: [String],

            // Array of player IDs on the team and their starting positions
            starting_players: [{
                player_id: String,
                position: String,
            }],

            // If true, this is the current "draft" of the lineup
            active: { type: Boolean, default: true },

            // If not active, then it was archived for the week with this number
            week_num: Number,
        }
    }

    /**
     * Calculate the fantasy points scored by the starting players on this lineup.
     * @return {Promise<number>}
     */
    async calculate_fantasy_points() {
        const starting_players = await this.players_in_starting()
        let points = 0

        for ( const player of starting_players ) {
            points += (await player.points_for_week(this.week_num))?.fantasy_points || 0
        }

        return points
    }

    /**
     * Given a team, fetch the latest draft lineup for that team.
     * This will also update the lineup record so that it includes all players
     * currently on the team (benching any players not already in the lineup).
     *
     * If no lineup exists, one will be created.
     *
     * @param {Team} team
     * @return {Promise<Lineup>}
     */
    static async get_and_update_for_team(team) {
        let lineup = await this.findOne({ team_id: team.id })

        if ( !lineup ) {
            lineup = new this({
                team_id: team.id,
                benched_player_ids: [],
                starting_players: [],
                active: true,
            })
        } else if ( !lineup.active ) {
            lineup = new this({
                team_id: team.id,
                benched_player_ids: lineup.benched_player_ids,
                starting_players: lineup.starting_players,
                active: true,
            })
        }

        // Make sure all players on the team are either on the bench or in the lineup
        const players = await team.players()
        for ( const player of players ) {
            if ( !lineup.has_player(player) ) {
                lineup.bench_player(player)
            }
        }

        await lineup.save()
        return lineup
    }

    /**
     * Returns an array of Players that are on the bench for this lineup.
     * @return {Promise<Array<Model>>}
     */
    async players_on_bench() {
        const Player = this.models.get('Player')
        return Player.find({
            _id: {
                $in: this.benched_player_ids.map(x => Player.to_object_id(x)),
            },
        })
    }

    /**
     * Returns an array of Players that are on the starting lineup.
     * @return {Promise<Array<Model>>}
     */
    async players_in_starting() {
        const Player = this.models.get('Player')
        return Player.find({
            _id: {
                $in: this.starting_players.map(x => Player.to_object_id(x.player_id)),
            },
        })
    }

    /**
     * Returns true if the given player is on the bench in this lineup.
     * @param {Player} player
     * @return {boolean}
     */
    has_bench_player(player) {
        return this.benched_player_ids.includes(player.id)
    }

    /**
     * Returns true if the given player is on the starting lineup in this lineup.
     * @param {Player} player
     * @return {boolean}
     */
    has_starting_player(player) {
        return !!this.starting_players.find(x => x.player_id === player.id)
    }

    /**
     * Returns true if the given player is in this lineup anywhere.
     * @param {Player} player
     * @return {boolean}
     */
    has_player(player) {
        return this.has_bench_player(player) || this.has_starting_player(player)
    }

    /**
     * Removes the player from the starting lineup if they are there and
     * adds them to the bench if they aren't already there.
     * @param {Player} player
     */
    bench_player(player) {
        this.starting_players = this.starting_players.filter(x => x.player_id !== player.id)
        if ( !this.benched_player_ids.includes(player.id) ) {
            this.benched_player_ids.push(player.id)
        }
    }

    /**
     * Given the player_id/position record, add it to the starting lineup.
     * @param {object} player_position_record
     */
    start_player(player_position_record) {
        this.benched_player_ids = this.benched_player_ids.filter(x => x !== player_position_record.player_id)
        this.starting_players = this.starting_players.filter(x => x.player_id !== player_position_record.player_id)
        this.starting_players.push(player_position_record)
    }

    /**
     * Remove all players from the bench and the starting lineup.
     */
    clear_lineup() {
        this.starting_players = []
        this.benched_player_ids = []
    }

    /**
     * Cast the lineup to an object which can be returned via the API.
     * @return {Promise<object>}
     */
    async to_api() {
        // positions to guarantee are in the line-up
        let lineup_positions = ['QB', 'RB', 'RB', 'WR', 'WR', 'TE', 'FLX', 'DST']

        const data = {
            team_id: this.team_id,
            active: this.active,
            week_num: this.week_num,
        }

        // build the starting players data
        const starting_players = await this.players_in_starting()
        const build_starting_players = []
        for ( const player of this.starting_players ) {
            // Find the player instance and cast it to an API object
            const player_inst = starting_players.find(x => x.id === player.player_id)
            build_starting_players.push({
                ...(await player_inst.to_api(true)),
                position: player.position
            })

            // remove the position from the array of positions to back-fill
            let found_one = false
            lineup_positions = lineup_positions.filter(x => {
                if ( !found_one && x === player.position ) {
                    found_one = true
                    return false
                }

                return true
            })
        }

        // Fill in any missing positions into the data
        for ( const position of lineup_positions ) {
            build_starting_players.push ({ position })
        }

        // build the benched players data
        const bench_players = await this.players_on_bench()
        const build_benched_players = []
        for ( const player of bench_players ) {
            // Cast the starting player to an API object
            const obj = await player.to_api(true)
            obj.position = 'B'
            build_benched_players.push(obj)
        }

        // If there are no players on the bench, add a placeholder slot.
        if ( build_benched_players.length < 1 ) {
            build_benched_players.push({ position: 'B' })
        }

        data.starting_players = build_starting_players
        data.benched_players = build_benched_players
        return data
    }
}

module.exports = exports = Lineup
