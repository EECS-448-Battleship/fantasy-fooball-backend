/*
 * ProviderRegistrationEnabled Middleware
 * -------------------------------------------------------------
 * Redirects the user to the login page if the registration page for
 * a particular auth provider is not enabled.
 */
const Middleware = require('flitter-auth/middleware/ProviderRegistrationEnabled')
class ProviderRegistrationEnabled extends Middleware {

    
    
}

module.exports = ProviderRegistrationEnabled
