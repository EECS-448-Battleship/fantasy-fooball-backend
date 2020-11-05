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

    async to_api() {
        return {
            player_number: this.player_number,
            player_name: this.player_name,
            player_position: this.player_position,
            team_name: this.team_name,
            image_url: this.image_url,
        }
    }
}

module.exports = exports = Player
