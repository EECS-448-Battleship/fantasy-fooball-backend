/*
 * Auth ProviderRoute Middleware
 * -------------------------------------------------------------
 * Many auth routes specify the name of a particular auth provider to
 * use. This middleware looks up the provider by that name and injects
 * it into the request.
 */
const Middleware = require('flitter-auth/middleware/ProviderRoute')
class ProviderRoute extends Middleware {
    
    

}

module.exports = ProviderRoute
