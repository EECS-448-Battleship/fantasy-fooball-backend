const { Service } = require('flitter-di')
const axios = require('axios').default;

/**
 * A service class for interacting with data from the SportsDataIO API.
 * @extends Service
 */
class SportsDataService extends Service {
    static get services() {
        return [...super.services, 'configs', 'models', 'utility']
    }

    /**
     * Resolves true if the game is currently in the draft stage.
     * @return {Promise<boolean>}
     */
    async is_draft_stage() {
        const Setting = this.models.get('models::setting')
        return this.utility.infer(await Setting.get('in_draft_stage'))
    }

    /**
     * Resolves to the current week number of gameplay.
     * @return {Promise<number>}
     */
    async current_play_week() {
        const Setting = this.models.get('models::setting')
        return this.utility.infer(await Setting.get('current_week'))
    }

    /**
     * Fetches a list of all players on the given team from the sports data API.
     * @param {string} team_key
     * @return {Promise<Array<any>>}
     */
    async get_team_players(team_key) {
        return this.get_request(`Players/${team_key}`)
    }

    /**
     * Fetches a list of all active teams from the sports data API.
     * @return {Promise<Array<any>>}
     */
    async get_active_teams() {
        return this.get_request('Teams')
    }

    /**
     * Make a get request to the sports data API.
     * @param {string} path
     * @param {string} [base = 'scores'] - the API domain (scores, projections, &c.)
     * @return {Promise<any>}
     */
    async get_request(path, base = 'scores') {
        const response = await axios.get(this.url(path, base))
        return response.data
    }

    /**
     * Fetches a list of player stats for all players in the league for the given week.
     * @param {number} week_num
     * @return {Promise<Array<any>>>}
     */
    async get_week_player_stats(week_num) {
        return this.get_request(`PlayerGameProjectionStatsByWeek/${this.configs.get('server.sports_data.season')}/${week_num}`, 'projections')
    }

    /**
     * Resolve an endpoint and an API domain to a fully-qualified URL to the sports data API.
     * @param {string} path
     * @param {string} [base = 'scores'] - the API domain (scores, projections, &c.)
     * @return {string}
     */
    url(path, base = 'scores') {
        if ( path.startsWith('/') ) path = path.slice(1)
        return `https://api.sportsdata.io/v3/nfl/${base}/json/${path}?key=${this.configs.get('server.sports_data.api_key')}`
    }
}

module.exports = exports = SportsDataService
