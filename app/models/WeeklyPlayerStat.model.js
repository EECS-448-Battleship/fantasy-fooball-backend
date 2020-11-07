const { Model } = require('flitter-orm')

class WeeklyPlayerStat extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    static get schema() {
        return {
            player_id: String,
            week_num: Number,
            patch_player_id: String,
            fantasy_points: Number,
        }
    }
}

module.exports = exports = WeeklyPlayerStat
