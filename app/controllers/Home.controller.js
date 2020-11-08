const { Controller } = require('libflitter')

/**
 * Home Controller
 * -------------------------------------------------------------
 * Controller for the main homepage of this Flitter app. Methods here
 * are used as handlers for routes specified in the route files.
 *
 * @extends Controller
 */
class Home extends Controller {
    static get services() {
        return [...super.services, 'sports_data']
    }

    /**
     * Serve the main welcome page.
     * @param req
     * @param res
     */
    welcome(req, res){
        if ( req.user ) {
            return res.redirect('/app')
        } else {
            return res.redirect('/auth/login')
        }
    }

    /**
     * Return the current session's status (including team information and
     * information about the current stage of gameplay).
     * @param req
     * @param res
     * @param next
     * @return {Promise<*>}
     */
    async get_status(req, res, next) {
        return res.api({
            team_id: req.user_team.id,
            team_name: req.user_team.team_name,
            current_week: await this.sports_data.current_play_week(),
            is_draft_stage: await this.sports_data.is_draft_stage(),
        })
    }
}

module.exports = Home
