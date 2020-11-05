const { Controller } = require('libflitter')

/*
 * Home Controller
 * -------------------------------------------------------------
 * Controller for the main homepage of this Flitter app. Methods here
 * are used as handlers for routes specified in the route files.
 */
class Home extends Controller {

    /*
     * Serve the main welcome page.
     */
    welcome(req, res){
        if ( req.user ) {
            return res.redirect('/app')
        } else {
            return res.redirect('/auth/login')
        }
    }
}

module.exports = Home
