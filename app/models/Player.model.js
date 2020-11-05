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
            player_number: String,
            player_name: String,
            player_position: String,
            team_name: String,
            image_url: String,
        }
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
