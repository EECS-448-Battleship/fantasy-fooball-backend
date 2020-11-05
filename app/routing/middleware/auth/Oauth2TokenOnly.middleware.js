/*
 * Oauth2TokenOnly Middleware
 * -------------------------------------------------------------
 * Allows the request to proceed if a valid OAuth2 bearer token was
 * provided. If not, return a JSON-encoded error message.
 */
const Middleware = require('flitter-auth/middleware/Oauth2TokenOnly')
class Oauth2TokenOnly extends Middleware {



}

module.exports = Oauth2TokenOnly
