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

        /*
         * Return the welcome view.
         * The page() method is added by Flitter and passes some
         * helpful contextual data to the view as well.
         */
        return res.page('welcome', {
            user: req.user,
            T: req.T,
        })
    }
}

module.exports = Home
