const AuthUser = require('flitter-auth/model/User')

/*
 * Auth user model. This inherits fields and methods from the default
 * flitter-auth/model/User model, however you can override methods and
 * properties here as you need.
 */
class User extends AuthUser {
    static get services() {
        return [...super.services, 'models']
    }

    static get schema() {
        return {...super.schema, ...{
            // other schema fields here
        }}
    }

    // Other members and methods here
    async team() {
        const Team = this.models.get('Team')
        return Team.getForUser(this)
    }
}

module.exports = exports = User
