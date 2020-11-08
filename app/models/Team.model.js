const { Model } = require('flitter-orm')

/**
 * Team Model
 * -------------------------------------------------------------
 * A model representing a single team in the game.
 *
 * @extends Model
 */
class Team extends Model {
    static get services() {
        return [...super.services, 'output', 'models']
    }

    /**
     * Define the flitter-orm schema of the model.
     */
    static get schema() {
        return {
            user_id: String,
            team_name: String,
            team_num: Number,
            player_ids: [String],
        }
    }

    /**
     * Look up or create a team for the given user.
     * @param {User} user
     * @return {Promise<Team>}
     */
    static async getForUser(user) {
        // try to find an existing team first
        const existing_team = await this.findOne({ user_id: user.id })
        if ( existing_team ) return existing_team

        // otherwise create a team for the user
        const new_team = new this({
            user_id: user.id,
            team_name: `${user.uid}'s team`,
            player_ids: [],
        })

        // Generate the next team number
        const highest_num_team = await this.sort('-team_num').findOne()
        if ( highest_num_team ) {
            new_team.team_num = highest_num_team.team_num + 1
        } else {
            new_team.team_num = 1
        }

        await new_team.save()
        return new_team
    }

    /**
     * returns the lineup
     * @return Promise<Lineup>
     */
    async lineup() {
        const Lineup = this.models.get('Lineup')
        return Lineup.get_and_update_for_team(this)
    }

    /**
     * Returns the players associated with the team.
     * @return Promise<Array<Player>>
     */
    async players() {
        const Player = this.models.get('Player')
        return Player.find({
            _id: {
                $in: this.player_ids.map(x => Player.to_object_id(x))
            }
        })
    }

    /**
     * Get the cumulative data for the team (total wins, losses, points scored & allowed)
     * @return object
     */
    async cumulative_data() {
        const Matchup = this.models.get('Matchup')
        const home_matchups = await Matchup.find({ home_team_id: this.id })
        const visitor_matchups = await Matchup.find({ visitor_team_id: this.id })

        const data = {
            wins: 0,
            losses: 0,
            points_scored: 0,
            points_allowed: 0,
        }

        for ( const matchup of home_matchups ) {
            if ( !matchup.complete ) continue

            data.points_scored += matchup.home_team_score
            data.points_allowed += matchup.visitor_team_score

            if ( matchup.home_team_score > matchup.visitor_team_score ) {
                data.wins += 1
            } else {
                data.losses += 0
            }
        }

        for ( const matchup of visitor_matchups ) {
            if ( !matchup.complete ) continue

            data.points_scored += matchup.visitor_team_score
            data.points_allowed += matchup.home_team_score

            if ( matchup.visitor_team_score > matchup.home_team_score ) {
                data.wins += 1
            } else {
                data.losses += 0
            }
        }

        return data
    }

    /**
     * Cast the team to the format expected for the API.
     * @return Promise<object>
     */
    async to_api() {
        let user
        try {
            const User = this.models.get('auth:User')
            user = await User.findById(this.user_id)
        } catch(e) {}

        return {
            user_id: this.user_id,
            user_display: user?.uid || 'Unknown User',
            team_name: this.team_name,
            team_num: this.team_num,
        }
    }
}

module.exports = exports = Team
