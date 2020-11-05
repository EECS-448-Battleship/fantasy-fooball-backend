const { Middleware } = require('libflitter')

/*
 * InjectUserTeam Middleware
 * -------------------------------------------------------------
 * For the authenticated user, looks up the associated Team instance
 * and injects it as request.team.
 */
class InjectUserTeam extends Middleware {
    static get services() {
        return [...super.services, 'models']
    }

    /*
     * Run the middleware test.
     */
    async test(req, res, next, args = {}){
        if ( !req.user ) return res.redirect('/auth/login')

        const Team = this.models.get('Team')
        req.user_team = await Team.getForUser(req.user)

        return next()
    }
}

module.exports = InjectUserTeam
