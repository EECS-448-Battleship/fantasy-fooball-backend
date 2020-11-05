/*
 * Global Middleware Definitions
 * -------------------------------------------------------------
 * These middleware are applied, in order, before every request that
 * Flitter handles, regardless of request type. Each middleware class
 * can be referenced using the middleware's Flitter canonical name.
 * 
 * Route-specific middleware should be specified in the corresponding
 * routes file.
 */
const Middleware = [
    "auth:Utility",

    // Injects the RequestLocalizationHelper
    "i18n:Localize",

]

module.exports = exports = Middleware
