const server_config = {

    /*
     * The server port.
     * Currently, Flitter supports HTTP/S natively.
     */
    port: env('SERVER_PORT', 80),

    /*
     * The type of environment the application is running in.
     * Usually, either "production" or "development".
     * Development mode may cause the application to output extra
     * debugging information not secure enough for production.
     */
    environment: env('ENVIRONMENT', 'production'),

    /*
     * The relative path to the front-end application.
     * Relative to the repository root.
     */
    frontend_path: env('FRONT_END_PATH', 'frontend'),

    sports_data: {
        api_key: env('SPORTSDATA_API_KEY'),
    },

    logging: {

        /*
         * The logging level. Usually, 1-4.
         * The higher the level, the more information is logged.
         */
        level: env('LOGGING_LEVEL', 2),

        /*
         * If true, API responses will be logged to the database.
         */
        api_logging: env('LOG_API_RESPONSES', false),

        /*
         * If true, caught request errors will be logged to the database.
         */
        error_logging: env('LOG_REQUEST_ERRORS', true),
    },

    session: {

        /*
         * The secret used to encrypt the session.
         * This should be set in the environment.
         */
        secret: env('SECRET', 'changeme'),

        /*
         * The max age (in milliseconds) of the session cookie.
         * If undefined, the max-age will be set to "Session" so it is
         * cleared when the browser exits.
         */
        max_age: env('SESSION_MAX_AGE', undefined),
    },

    uploads: {
        /*
         * If true, the server will accept files uploaded in the request.
         */
        enable: env('SERVER_ENABLE_UPLOADS', false),

        /*
         * Regex to match routes that file uploads are accepted from.
         * By default, this accepts files uploaded on all routes.
         */
        allowed_path: /./,

        /*
         * Path for uploaded files.
         * Should be relative to the application root.
         *
         * Note that this is NOT the config for flitter-upload.
         */
        destination: './tmp.uploads'
    },

    ssl: {
        /*
         * If true, the server will be HTTPS, not HTTP.
         */
        enable: env('SSL_ENABLE', false),

        /*
         * Path to your domain's certificate file.
         * This should contain any intermediate certificates as well.
         */
        cert_file: env('SSL_CERT_FILE', 'cert.pem'),

        /*
         * Path to your domain's certificate key.
         */
        key_file: env('SSL_KEY_FILE', 'cert.key'),
    },

}

module.exports = server_config
