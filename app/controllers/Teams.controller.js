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
     * Save changes to the current user's team and return it as API data.
     * @param req
     * @param res
     * @param next
     * @return {Promise<*>}
     */
    async save_my_team(req, res, next) {
        req.user_team.team_name = String(req.body.team_name).trim()
        await req.user_team.save()
        return res.api(await req.user_team.to_api())
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
        const lineup = await req.user_team.lineup()
        return res.api(await lineup.to_api())
    }

    /**
     * Saves the lineup for the current user's team and returns it as API data.
     * @param req
     * @param res
     * @param next
     * @return {Promise<void>}
     */
    async save_my_team_lineup(req, res, next) {
        if ( !Array.isArray(req.body.starting_players) ) {
            return res.status(400)
                .message('Missing required field: starting_players')
                .api()
        }

        if ( !Array.isArray(req.body.benched_players) ) {
            return res.status(400)
                .message('Missing required field: benched_players')
                .api()
        }

        const player_ids = (await req.user_team.players()).map(x => x.id)
        const lineup = await req.user_team.lineup()
        lineup.clear_lineup()

        for ( const player of req.body.starting_players ) {
            if ( !player.id || !player.position ) continue;

            const lineup_record = {
                player_id: player.id,
                position: player.position,
            }

            if ( !player_ids.includes(lineup_record.player_id) ) {
                return res.status(400)
                    .message(`Sorry, the player ${lineup_record.player_id} is not on your team.`)
                    .api()
            }

            lineup.start_player(lineup_record)
        }

        for ( const player of req.body.benched_players ) {
            if ( !player.id ) continue;

            if ( !player_ids.includes(player.id) ) {
                return res.status(400)
                    .message(`Sorry, the player ${player.id} is not on your team.`)
                    .api()
            }

            lineup.bench_player(player)
        }

        console.log('pre save', lineup)

        // Save the partial lineup
        await lineup.save()

        console.log('post save', lineup)

        // Fetch a fresh version to fill in any missing players
        const corrected_lineup = await req.user_team.lineup()

        console.log('corrected', corrected_lineup)

        return res.api(await corrected_lineup.to_api())
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
