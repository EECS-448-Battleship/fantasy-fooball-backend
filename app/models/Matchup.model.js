const { Model } = require('flitter-orm')

class Matchup extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    static get schema() {
        return {
            home_team_id: String,
            visitor_team_id: String,
            week_num: Number,
            complete: { type: Boolean, default: false },
            home_team_score: Number,
            visitor_team_score: Number,
        }
    }
}

module.exports = exports = Matchup
