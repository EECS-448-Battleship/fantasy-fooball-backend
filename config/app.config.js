const app_config = {

    /*
     * The name of the application.
     * Used through-out the application as the proper display name.
     */
    name: env('APP_NAME', 'Flitter'),

    /*
     * URL of the application.
     * Can be used to generate fully-qualified links.
     */
    url: env('APP_URL', 'http://localhost:8000/'),

    /*
     * The default locale that new users to the site will be assigned.
     */
    default_locale: env('APP_DEFAULT_LOCALE', 'en_US'),
}

module.exports = app_config
