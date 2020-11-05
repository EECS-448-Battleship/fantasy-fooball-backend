const { Controller } = require('libflitter')

/*
 * Teams Controller
 * -------------------------------------------------------------
 */
class Teams extends Controller {
    static get services() {
        return [...super.services, 'models']
    }

    /**
     * Return the API data for the current user's team.
     * Requires an authenticated user.
     * @param req
     * @param res
     * @param next
     * @return {Promise<void>}
     */
    async get_my_team(req, res, next) {
        return res.api(await req.user_team.to_api())
    }

    /**
     * Return the API data for the players on the current user's team.
     * @param req
     * @param res
     * @param next
     * @return {Promise<*>}
     */
    async get_my_team_players(req, res, next) {
        const players = await req.user_team.players()
        return res.api(await Promise.all(players.map(x => x.to_api())))
    }

    /**
     * Return the API data for the current lineup for the current user's team.
     * @param req
     * @param res
     * @param next
     * @return {Promise<*>}
     */
    async get_my_team_current_lineup(req, res, next) {
        const Lineup = this.models.get('Lineup')
        const lineup = await Lineup.get_and_update_for_team(req.user_team)
        return res.api(await lineup.to_api())
    }

    /**
     * Return the API data for a list of all teams.
     * @param req
     * @param res
     * @return {Promise<*>}
     */
    async list_all_teams(req, res) {
        const TeamModel = this.models.get('Team')
        const teams = await TeamModel.find()
        return res.api(teams)
    }

    /**
     * API endpoint for creating a new team.
     * @todo remove this - happens automatically per-user
     * @param req
     * @param res
     * @return {Promise<*>}
     */
    async create_team(req, res) {
        const TeamModel = this.models.get('Team')

        if ( !req.body.team_name || !req.body.team_num ) {
            return res.status(400)
                .message('Missing team_name or team_num')
                .api()
        }

        const duplicate_team = await TeamModel.findOne({
            team_num: req.body.team_num,
        })

        if ( duplicate_team ) {
            return res.status(400)
                .message('That team number is already in use!')
                .api()
        }

        const team = new TeamModel({
            team_name: req.body.team_name,
            team_num: req.body.team_num,
        })

        await team.save()
        return res.api(team)
    }
}

module.exports = Teams
