const { Service } = require('flitter-di')
const axios = require('axios').default;

/**
 * A service class for interacting with data from the SportsDataIO API.
 */
class SportsDataService extends Service {
    static get services() {
        return [...super.services, 'configs', 'models', 'utility']
    }

    async is_draft_stage() {
        const Setting = this.models.get('models::setting')
        return !!this.utility.infer(await Setting.get('in_draft_stage'))
    }

    async current_play_week() {
        const Setting = this.models.get('models::setting')
        return !!this.utility.infer(await Setting.get('current_week'))
    }

    async get_team_players(team_key) {
        return this.get_request(`Players/${team_key}`)
    }

    async get_active_teams() {
        return this.get_request('Teams')
    }

    async get_request(path, base = 'scores') {
        const response = await axios.get(this.url(path, base))
        return response.data
    }

    async get_week_player_stats(week_num) {
        return this.get_request(`PlayerGameProjectionStatsByWeek/${this.configs.get('server.sports_data.season')}/${week_num}`, 'projections')
    }

    url(path, base = 'scores') {
        if ( path.startsWith('/') ) path = path.slice(1)
        return `https://api.sportsdata.io/v3/nfl/${base}/json/${path}?key=${this.configs.get('server.sports_data.api_key')}`
    }
}

module.exports = exports = SportsDataService
