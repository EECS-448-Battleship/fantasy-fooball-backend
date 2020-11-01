const { Middleware } = require('libflitter')

/*
 * HomeLogger Middleware
 * -------------------------------------------------------------
 * This is a sample middleware. It simply prints a console message when
 * the route that it is tied to is accessed. By default, it is called if
 * the '/' route is accessed. It can be injected in routes globally using
 * the middlewares service.
 */
class HomeLogger extends Middleware {
    static get services() {
        return [...super.services, 'output']
    }

    /*
     * Run the middleware test.
     * This method is required by all Flitter middleware.
     * It should either call the next function in the stack,
     * or it should handle the response accordingly.
     */
    test(req, res, next, args) {
        this.output.debug('Home was accessed!')

        /*
         * Call the next function in the stack.
         */
        next()
    }
}

module.exports = HomeLogger
