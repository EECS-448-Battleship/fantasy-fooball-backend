const { Model } = require('flitter-orm')

/*
 * Team Model
 * -------------------------------------------------------------
 */
class Team extends Model {
    static get services() {
        return [...super.services, 'output']
    }

    /*
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
}

module.exports = exports = Team
