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

    async to_api() {
        const home_team = await this.home_team()
        const visitor_team = await this.visitor_team()

        const data = {
            date: '2020-11-11', // TODO generate this in the matches patch
            team_1: home_team.team_name,
            team_1_projection: await (await home_team.lineup())?.calculate_fantasy_points() + Math.round(Math.random() * (5 - (-5)) + (-5)),

            team_2: visitor_team.team_name,
            team_2_projection: await (await visitor_team.lineup())?.calculate_fantasy_points() + Math.round(Math.random() * (5 - (-5)) + (-5)),
        }

        if ( data.team_1_projection < 0 ) data.team_1_projection = 0
        if ( data.team_2_projection < 0 ) data.team_2_projection = 0

        if ( this.complete ) {
            const winner = this.home_team_score > this.visitor_team_score ? home_team : visitor_team

            data.winner = winner.team_name
            data.winner_score = Math.max(this.home_team_score, this.visitor_team_score)
            data.loser_score = Math.min(this.home_team_score, this.visitor_team_score)
        }

        return data
    }
}

module.exports = exports = Matchup
