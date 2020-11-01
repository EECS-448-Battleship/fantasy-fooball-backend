const database_config = {

    /*
     * The name of the database.
     */
    name: env('DATABASE_NAME', 'flitter'),

    /*
     * The hostname of the database server.
     * Should be fully-qualified or resolvable.
     */
    host: env('DATABASE_HOST', 'localhost'),

    /*
     * MongoDB port on the database host.
     */
    port: env('DATABASE_PORT', 27017),

    auth: {

        /*
         * Boolean true if the database connection requires auth.
         */
        require: env('DATABASE_AUTH', false),

        /*
         * MongoDB username and password.
         */
        username: env('DATABASE_USERNAME', ''),
        password: env('DATABASE_PASSWORD', ''),
    },
}

module.exports = database_config
