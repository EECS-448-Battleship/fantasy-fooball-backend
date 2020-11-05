/*
 * UserOnly Middleware
 * -------------------------------------------------------------
 * Allows the request to proceed if there's an authenticated user
 * in the session. Otherwise, redirects the user to the login page
 * of the default provider.
 */
const Middleware = require('flitter-auth/middleware/UserOnly')
class UserOnly extends Middleware {

    
    
}

module.exports = UserOnly
