const { Controller } = require('libflitter')
/**
 * DraftBoard controller
 * ------------------------------------------------------------------------
 * This controller contains logic for handling API requests related to fetching
 * and drafting available players. Its methods should handle Express requests &
 * responses.
 *
 * @extends Controller
 */
class DraftBoard extends Controller {
    static get services() {
        return [...super.services, 'models']
    }

    /**
     * Returns the API data containing the players available to draft
     * @param  req 
     * @param  res 
     * @param  next 
     * @returns Promise<void>
     */
    async get_available_players(req, res, next) {
        const Player = this.models.get('Player')
        const players = await Player.get_unobligated_players()
        const api_data = []

        for ( const player of players ) {
            api_data.push(await player.to_api())
        }

        return res.api(api_data)
    }

    /**
     * adds the selected player to the team 
     * @param  req 
     * @param  res 
     * @param  next
     * @returns Promise<void>
     */
    async draft_player_to_team(req, res, next) {
        if ( !req.body.player_id ) {
            return res.status(400)
                .message('Missing required field: player_id')
                .api()
        }

        // look up the player specified in the request
        const Player = this.models.get('Player')
        const player = await Player.findById(req.body.player_id)
        if ( !player ) {
            return res.status(400)
                .message('A player with that ID cannot be found.')
                .api()
        }

        // Don't allow drafting already-drafted players
        if ( await player.is_obligated() ) {
            return res.status(400)
                .message('This player has already been drafted.')
                .api()
        }

        req.user_team.player_ids.push(player.id)
        await req.user_team.save()
        return res.api()
    }
}

module.exports = exports = DraftBoard
