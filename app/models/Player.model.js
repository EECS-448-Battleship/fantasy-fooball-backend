const { Model } = require('flitter-orm')


/*
 * Player Model
 * -------------------------------------------------------------
 */
class Player extends Model {
    static get services() {
        return [...super.services, 'output', 'models']
    }

    /*
     * Define the flitter-orm schema of the model.
     */
    static get schema() {
        return {
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

    async points_for_week(week_num) {
        const WeeklyPlayerStat = this.models.get('WeeklyPlayerStat')
        return WeeklyPlayerStat.findOne({ week_num, player_id: this.id })
    }

    async is_obligated() {
        const Team = this.models.get('Team')
        const teams = await Team.find()
        for ( const team of teams ) {
            if ( team.player_ids.includes(this.id) ) return true
        }

        return false
    }

    async to_api() {
        return {
            id: this.id,
            number: this.player_number,
            name: this.full_name,
            position: this.fantasy_position,
            team_name: this.patch_data.patch_team_name,
            image: this.photo_url,
            stats: {}, // TODO - populate some stats!
        }
    }
}

module.exports = exports = Player
