/*
 * Auth Form Routes
 * -------------------------------------------------------------
 * The routes here pertain to auth forms like register/login etc.
 * The general structure is as follows:
 *
 *      /auth/{provider name}/{action}

 * Individual providers may be interacted with individually, therefore:
 *
 *      /auth/flitter/register
 *
 * You can omit the provider name to use the default provider:
 *
 *      /auth/register
 */
const index = {

    prefix: '/auth',

    middleware: [

    ],

    get: {
        '/:provider/register': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'middleware::auth:ProviderRegistrationEnabled',
            'controller::auth:Forms.registration_provider_get',
        ],
        '/register': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'middleware::auth:ProviderRegistrationEnabled',
            'controller::auth:Forms.registration_provider_get',
        ],
        
        '/:provider/login': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'controller::auth:Forms.login_provider_get',
        ],
        '/login': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'controller::auth:Forms.login_provider_get',
        ],
        
        '/:provider/logout': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:UserOnly',
            'controller::auth:Forms.logout_provider_clean_session',

            // Note, this separation is between when the auth action has happened properly
            // and before the user is allowed to continue. You can use it to add your own
            // custom middleware for auth flow handling.

            'controller::auth:Forms.logout_provider_present_success',
        ],
        '/logout': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:UserOnly',
            'controller::auth:Forms.logout_provider_clean_session',
            'controller::auth:Forms.logout_provider_present_success',
        ],
    },

    post: {
        '/:provider/register': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'middleware::auth:ProviderRegistrationEnabled',
            'controller::auth:Forms.registration_provider_create_user',
            'controller::auth:Forms.registration_provider_present_user_created',
        ],
        '/register': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'middleware::auth:ProviderRegistrationEnabled',
            'controller::auth:Forms.registration_provider_create_user',
            'controller::auth:Forms.registration_provider_present_user_created',
        ],
        
        '/:provider/login': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'controller::auth:Forms.login_provider_authenticate_user',
            'controller::auth:Forms.login_provider_present_success',
        ],
        '/login': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:GuestOnly',
            'controller::auth:Forms.login_provider_authenticate_user',
            'controller::auth:Forms.login_provider_present_success',
        ],

        '/:provider/logout': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:UserOnly',
            'controller::auth:Forms.logout_provider_clean_session',
            'controller::auth:Forms.logout_provider_present_success',
        ],
        '/logout': [
            'middleware::auth:ProviderRoute',
            'middleware::auth:UserOnly',
            'controller::auth:Forms.logout_provider_clean_session',
            'controller::auth:Forms.logout_provider_present_success',
        ],
    },
}

module.exports = exports = index
