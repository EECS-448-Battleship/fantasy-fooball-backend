/*
 * Index Routes
 * -------------------------------------------------------------
 * This is a sample routes file. Routes and their handlers should be
 * defined here, but no logic should occur.
 */
const index = {

    /*
     * Define the prefix applied to each of these routes.
     * For example, if prefix is '/auth':
     *      '/' becomes '/auth'
     *      '/login' becomes '/auth/login'
     */
    prefix: '/',

    /*
     * Define middleware that should be applied to all
     * routes defined in this file. Middleware should be
     * included using its non-prefixed canonical name.
     *
     * You can pass arguments along to a middleware by
     * specifying it as an array where the first element
     * is the canonical name of the middleware and the
     * second element is the argument passed to the
     * handler's test() method.
     */
    middleware: [
        // Sets the locale scope
        ['i18n:Scope', {scope: 'common'}],

        ['HomeLogger', {note: 'arguments can be specified as the second element in this array'}],
        // 'MiddlewareName', // Or without arguments
    ],

    /*
     * Define GET routes.
     * These routes are registered as GET methods.
     * Handlers for these routes should be specified as
     * an array of canonical references to controller methods
     * or middleware that are applied in order.
     */
    get: {
        // handlers should be a list of either controller:: or middleware:: references
        // e.g. middleware::HomeLogger
        // e.g. controller::Home.welcome
        '/': [
            'controller::Home.welcome'
        ],

        // Placeholder for auth dashboard. You'd replace this with
        // your own route protected by 'middleware::auth:UserOnly'
        '/dash': [ 'controller::Home.welcome' ],
    },

    /*
     * Define POST routes.
     * These routes are registered as POST methods.
     * Handlers for these routes should be specified as
     * an array of canonical references to controller methods
     * or middleware that are applied in order.
     */
    post: {

    },

    // You can include other HTTP verbs here.
    // Supported ones are: get, post, put, delete, copy, patch
}

module.exports = exports = index
