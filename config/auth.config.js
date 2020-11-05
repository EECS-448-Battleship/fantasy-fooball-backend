const auth_config = {

    default_provider: env('AUTH_DEFAULT_PROVIDER', 'flitter'),
    default_login_route: '/dash',

    servers: {
        // OAuth2 authorization server
        oauth2: {
            enable: env('OAUTH2_SERVER_ENABLE', false),

            // Grants that are available to clients. Supported types are authorization_code, password
            grants: ['authorization_code'],

            // Built in data retrieval endpoints. These are protected by user-specific OAuth2 tokens
            built_in_endpoints: {

                // Get the token user's data
                user: {
                    enable: env('OAUTH2_SERVER_ENABLE', true),

                    // Fields to return to the endpoint
                    // The keys are the keys in the request. The values are the keys in the user.
                    fields: {
                        username: 'uid',
                        id: 'uuid',

                        // Data is a special key. It's key-value pairs are included,
                        // unserialized, from the user's JSON data.
                        data: {
                            // Fields stored in serialized data can be included here:
                            // special_field: 'some_json_data_field',
                        },
                    },
                },
            },
        },
    },

    // Auth provider configurations
    // You can have multiple of the same 'type' of auth source, but they
    // must have unique names. The name is the key of the source config.
    // Valid types are (by default): FlitterProvider, LdapProvider, Oauth2Provider
    sources: {
        // Default, database-backed auth provider
        flitter: {
            type: 'FlitterProvider',
            enable: env('AUTH_FLITTER_ENABLE', true),
            registration: env('AUTH_FLITTER_REGISTRATION', true),
            min_password_length: env('AUTH_MIN_PASSWORD_LENGTH', 8),
        },

        // LDAP-backed auth provider
        example_ldap: {
            type: 'LdapProvider',
            enable: env('AUTH_LDAP_ENABLE', false),

            host: env('AUTH_LDAP_HOST', 'localhost'),
            port: env('AUTH_LDAP_PORT', 389),
            secure: env('AUTH_LDAP_BIND_SECURE', false),
            bind_dn: env('AUTH_LDAP_BIND_DN', 'uid=auth_agent,ou=people,dc=domain,dc=local'),
            bind_secret: env('AUTH_LDAP_BIND_PW'),

            user_search_base: env('AUTH_LDAP_SEARCH_BASE', 'ou=people,dc=domain,dc=local'),
            user_filter: env('AUTH_LDAP_USER_FILTER', '(uid=%u)'), // %u is the login provided username

            min_password_length: env('AUTH_MIN_PASSWORD_LENGTH', 8),

            // Maps flitter-auth roles to LDAP groups
            role_groups: {
                // Should correspond to existing auth roles
                // role_name: 'cn=somegroup,ou=groups,dc=domain,dc=local',
            },

            // Maps user attributes to LDAP data attributes
            attributes: {
                uid: env('AUTH_LDAP_ATTR_UID', 'uid'),
                first_name: env('AUTH_LDAP_ATTR_FIRST_NAME', 'cn'),
                last_name: env('AUTH_LDAP_ATTR_LAST_NAME', 'sn'),
                email: env('AUTH_LDAP_ATTR_EMAIL', 'mail'),

                // Special case - used to determine group memberships
                group_membership: env('AUTH_LDAP_ATTR_GROUPS', 'memberOf'),
            },

            registration: env('AUTH_LDAP_REGISTRATION', false),

            // Default attributes for new registered users
            // %u can be used to interpolate the registered user's uid
            registration_merge_attributes: {
                objectClass: ['posixAccount', 'shadowAccount', 'inetOrgPerson'],
                sn: '%u',
                cn: '%u',
                gecos: '%u',
                uidNumber: -1,
                gidNumber: -1,
                homeDirectory: '/dev/null',
            },
        },

        example_oauth: {
            type: 'Oauth2Provider',
            enable: env('AUTH_OAUTH2_ENABLE', false),

            source_name: env('AUTH_OAUTH2_SOURCE_NAME', 'GitHub'),
            source_client_id: env('AUTH_OAUTH2_CLIENT_ID'),
            source_client_secret: env('AUTH_OAUTH2_CLIENT_SECRET'),

            // Login page destination where the user will be redirected to on login
            // %c will be interpolated with the client id
            // %r will be interpolated with the redirect callback url
            //  NOTE: This url is the same as the login page - /auth/oauth2/login
            source_login_page: env('AUTH_OAUTH2_LOGIN_REDIRECT', 'https://github.com/login/oauth/authorize?client_id=%c'),

            // Information about the OAuth2 Callback
            callback: {
                // URL query parameter name with the authorization_code token
                // e.g. ?code=XXXXXXXXXX
                token_key: 'code',
            },

            // Information about the endpoint flitter-auth will use to redeem
            // the authorization_code token for a bearer token
            source_token: {
                endpoint: 'https://github.com/login/oauth/access_token',

                // Field name where the authorization_code token will be specified in the request
                token_key: 'code',

                // Field name for the client id
                client_id_key: 'client_id',

                // Field name for the client secret
                client_secret_key: 'client_secret',

                // Field name for the grant_type ('authorization_type')
                grant_type_key: 'grant_type',

                // Field name where the bearer token will be specified in the response
                response_token_key: 'access_token',
            },

            // Information about the endpoint flitter-auth will use to get
            // user information after it retrieves a bearer token
            user_data: {
                endpoint: 'https://api.github.com/user',
                method: 'get', // 'get' or 'post' only

                // In the response data, what key is the user data in?
                // e.g. if 'data', then {'data': { ... }}
                // Set falsy to assume the data exists in the root: { ... }
                // data_root: 'data',

                // Value that prefixes the token in the 'Authorization: ' header.
                // e.g. 'token ' would mean 'token a0fw93ja0w93ja093wj'
                //      'Bearer ' would be 'Bearer 0329j0239dj209j3209jd'
                token_prefix: 'token ',

                // Mapping of user model attributes to OAuth2 return data from the endpoint
                // Note that uuid is not allowed, and uid is required
                attributes: {
                    uid: 'login',
                },
            },
        },
    },

    roles: {

        // Roles can be defined here as arrays of permissions:
        // 'role_name': [ 'permission1', 'permission2' ],
        // Then, users with that role will automatically inherit the permissions.

    },

}

module.exports = auth_config
