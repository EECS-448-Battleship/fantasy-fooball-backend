/*
 * oauth2 Routes
 * -------------------------------------------------------------
 * Routes pertaining to the flitter-auth OAuth2 server implementation.
 */
const oauth2 = {

    // Route prefix for all below routes
    prefix: '/auth/service/oauth2/',

    middleware: [
        // Return 404 errors for these routes if the oauth2 server isn't enabled
        ['util:Config', {key: 'auth.servers.oauth2.enable'}],
    ],

    get: {
        // Show the authorization page
        '/authorize': [
            'middleware::auth:UserOnly',
            'controller::auth:Oauth2.authorize_get',
        ],

        // Built-in data endpoints
        // Get the user info using a bearer token
        '/data/user': [
            ['util:Config', {key: 'auth.servers.oauth2.build_in_endpoints.user.enable'}],
            'middleware::auth:Oauth2TokenOnly',
            'controller::auth:Oauth2.data_user_get',
        ],
    },

    post: {
        // Handle a successful authorization
        '/authorize': [
            'middleware::auth:UserOnly',
            'controller::auth:Oauth2.authorize_post',
        ],

        // Redeem an authorization code for an OAuth2 bearer token
        '/redeem': [
            'controller::auth:Oauth2.redeem_token',
        ],
    },
}

module.exports = oauth2
