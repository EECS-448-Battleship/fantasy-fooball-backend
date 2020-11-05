module.exports = exports = {
    prefix: '/auth/action', // This is assumed by flitter-auth. Don't change it.
    middleware: [],
    get: {
        '/:key': [
            'middleware::auth:KeyAction',
            'controller::auth:KeyAction.handle',
        ],
    },
    post: {
        '/:key': [
            'middleware::auth:KeyAction',
            'controller::auth:KeyAction.handle',
        ],
    },
}
