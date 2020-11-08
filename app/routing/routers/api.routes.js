/*
 * API Routes
 * -------------------------------------------------------------
 * These routes are related to the AJAX API used by the front-end.
 */
const index = {

    /*
     * Define the prefix applied to each of these routes.
     * For example, if prefix is '/auth':
     *      '/' becomes '/auth'
     *      '/login' becomes '/auth/login'
     */
    prefix: '/api/v1',

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
        // Require an authenticated user
        'auth:UserOnly',

        // Inject the user's team
        'InjectUserTeam',
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

        '/my-team': ['controller::Teams.get_my_team'],
        '/my-team/players': ['controller::Teams.get_my_team_players'],
        '/my-team/lineup': ['controller::Teams.get_my_team_current_lineup'],

        '/draft-board/available': ['controller::DraftBoard.get_available_players'],

        '/matchups': ['controller::Scores.get_weekly_scores'],
        '/league-standings': ['controller::Scores.get_league_standings'],

        '/status': ['controller::Home.get_status'],
    },

    /*
     * Define POST routes.
     * These routes are registered as POST methods.
     * Handlers for these routes should be specified as
     * an array of canonical references to controller methods
     * or middleware that are applied in order.
     */
    post: {
        '/my-team': ['controller::Teams.save_my_team'],
        '/my-team/lineup': ['controller::Teams.save_my_team_lineup'],

        '/draft-board/draft-player': ['controller::DraftBoard.draft_player_to_team'],
    },

    // You can include other HTTP verbs here.
    // Supported ones are: get, post, put, delete, copy, patch
}

module.exports = exports = index
