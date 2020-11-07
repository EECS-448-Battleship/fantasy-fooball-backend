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

    async home_team() {
        const Team = this.models.get('Team')
        return Team.findById(this.home_team_id)
    }

    async visitor_team() {
        const Team = this.models.get('Team')
        return Team.findById(this.visitor_team_id)
    }
}

module.exports = exports = Matchup
