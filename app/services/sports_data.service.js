const { Service } = require('flitter-di')
const axios = require('axios').default;

/**
 * A service class for interacting with data from the SportsDataIO API.
 */
class SportsDataService extends Service {
    static get services() {
        return [...super.services, 'configs']
    }

    async get_team_players(team_key) {
        return this.get_request(`Players/${team_key}`)
    }

    async get_active_teams() {
        return this.get_request('Teams')
    }

    async get_request(path) {
        const response = await axios.get(this.url(path))
        return response.data
    }

    url(path) {
        if ( path.startsWith('/') ) path = path.slice(1)
        return `https://api.sportsdata.io/v3/nfl/scores/json/${path}?key=${this.configs.get('server.sports_data.api_key')}`
    }
}

module.exports = exports = SportsDataService
