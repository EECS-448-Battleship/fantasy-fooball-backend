const { Middleware } = require('libflitter')

/**
 * InjectUserTeam Middleware
 * -------------------------------------------------------------
 * For the authenticated user, looks up the associated Team instance
 * and injects it as request.user_team.
 *
 * @extends Middleware
 */
class InjectUserTeam extends Middleware {
    static get services() {
        return [...super.services, 'models']
    }

    /**
     * Inject the user's team into the request, or redirect to a login page.
     * @param req
     * @param res
     * @param next
     * @param [args = {}]
     */
    async test(req, res, next, args = {}){
        if ( !req.user ) return res.redirect('/auth/login')

        const Team = this.models.get('Team')
        req.user_team = await Team.getForUser(req.user)

        return next()
    }
}

module.exports = InjectUserTeam
