/*
 * GuestOnly Middleware
 * -------------------------------------------------------------
 * Allows the request to proceed unless there's an authenticated user
 * in the session. If so, redirect to the auth flow destination if one
 * exists. If not, redirect to the default login route.
 */
const Middleware = require('flitter-auth/middleware/GuestOnly')
class GuestOnly extends Middleware {
    
    
    
}

module.exports = GuestOnly
