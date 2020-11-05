const AuthUser = require('flitter-auth/model/User')

/*
 * Auth user model. This inherits fields and methods from the default
 * flitter-auth/model/User model, however you can override methods and
 * properties here as you need.
 */
class User extends AuthUser {
    static get schema() {
        return {...super.schema, ...{
            // other schema fields here
        }}
    }

    // Other members and methods here
}

module.exports = exports = User
