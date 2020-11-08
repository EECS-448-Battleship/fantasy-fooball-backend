const { Model } = require('flitter-orm')
const ActiveScope = require('./scopes/Active.scope')

/**
 * Player Model
 * -------------------------------------------------------------
 * A model representing a single player in the game.
 *
 * @extends Model
 */
class Player extends Model {
    static get services() {
        return [...super.services, 'output', 'models', 'sports_data']
    }

    // Enable soft-deletes using the active scope
    static scopes = [new ActiveScope()]

    /**
     * Define the flitter-orm schema of the model.
     */
    static get schema() {
        return {
            // Data used by the patches internally, but not exposed to the API
            patch_data: {
                patch_team_id: Number,
                patch_team_name: String,
                patch_team_key: String,
                player_id: Number,
                draft_position: Number,
            },

            player_number: Number,
            first_name: String,
            last_name: String,
            full_name: String,
            position: String,
            fantasy_position: String,
            height: String,
            weight: Number,
            birthday: String,
            experience: String,
            experience_string: String,
            age: Number,
            photo_url: String,

            // Statistics pre-generated for the player to optimize performance
            seed_stats: Object,

            // False if the player doesn't have any week-1 stats.
            // If so, they will be hidden to make the game more playable.
            is_active: { type: Boolean, default: true },
        }
    }

    static from_patch_data(data) {
        const model_data = {
            patch_data: {
                patch_team_id: data.TeamID,
                // patch_team_name,
                // patch_team_key,
                player_id: data.PlayerID,
                draft_position: data.AverageDraftPosition,
            },
            player_number: data.Number,
            first_name: data.FirstName,
            last_name: data.LastName,
            full_name: data.Name,
            position: data.Position,
            fantasy_position: data.FantasyPosition,
            height: data.Height,
            weight: data.Weight,
            birthday: data.BirthDateString,
            experience: data.Experience,
            experience_string: data.ExperienceString,
            age: data.Age,
            photo_url: data.PhotoUrl
        }

        return new this(model_data)
    }

    /**
     * returns all of the unobligated players across all teams
     * @return Promise<Array<Player>>
     */
    static async get_unobligated_players() {
        const Team = this.prototype.models.get('Team')
        let obligated_player_ids = []

        const teams = await Team.find()
        for ( const team of teams ) {
            obligated_player_ids = obligated_player_ids.concat(team.player_ids)
        }

        return this.find({
            _id: {
                $nin: obligated_player_ids.map(x => this.to_object_id(x))
            }
        })
    }

    /**
     * Returns the stats for the player for the given week.
     * @param {number} week_num
     * @returns Promise<WeeklyPlayerStat>
     */
    async points_for_week(week_num) {
        const WeeklyPlayerStat = this.models.get('WeeklyPlayerStat')
        return WeeklyPlayerStat.findOne({ week_num, player_id: this.id })
    }

    /**
     * Determine whether the player belongs to a team or not.
     * @returns {Promise<boolean>} - true if the player is obligated
     */
    async is_obligated() {
        const Team = this.models.get('Team')
        const teams = await Team.find()
        for ( const team of teams ) {
            if ( team.player_ids.includes(this.id) ) return true
        }

        return false
    }

    /**
     * Cast the player to a format compatible with the API.
     * @param {boolean} [with_stats = false] - if true, look up the player's weekly stats
     * @returns Promise<object>
     */
    async to_api(with_stats = false) {
        let stat
        try {
            const current_week = await this.sports_data.current_play_week()
            stat = with_stats ? await this.points_for_week(current_week) : undefined
        } catch (e) {}

        return {
            id: this.id,
            number: this.player_number,
            name: this.full_name,
            position: this.fantasy_position,
            team_name: this.patch_data.patch_team_name,
            image: this.photo_url,
            stats: (await stat?.to_api()) || this.seed_stats || {},
        }
    }
}

module.exports = exports = Player
