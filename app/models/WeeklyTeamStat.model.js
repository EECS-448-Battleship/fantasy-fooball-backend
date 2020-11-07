const { Model } = require('flitter-orm')

class WeeklyTeamStat extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    static get schema() {
        return {
            team_id: String,
            lineup_id: String,
            week_num: Number,
            player_ids: [String],
            fantasy_points: Number,
        }
    }
}

module.exports = exports = WeeklyTeamStat
