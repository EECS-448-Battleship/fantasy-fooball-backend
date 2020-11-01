const { Middleware } = require('libflitter')

/*
 * Config Middleware
 * -------------------------------------------------------------
 * Checks the specified configuration key (and optionally the value).
 * If the configuration matches the required value, the request can
 * proceed. Otherwise, a 404 will be returned.
 *
 * To use, add the call to your route's middleware:
 *
 * ['middleware::util:Config', {key: 'server.ssl.test', value: true}],
 *
 * In this case, the request would be allowed to proceed in the case:
 *  services.configs.get('server.ssl.test') === true
 *
 * The 'value' attribute is optional. If none is provided, the request
 * can proceed if the config value is truthy.
 */
class Config extends Middleware {
    static get services() {
        return [...super.services, 'configs', 'output']
    }

    /*
     * Run the middleware test.
     */
    test(req, res, next, args = {}){
        if ( !args.key ) return res.error(500)

        const config = this.configs.get(args.key)

        if ( !args.value && !config ) {
            if ( !config && typeof config === 'undefined' )
                this.output.warn(`util:Config middleware check failed because it tried to access a config that doesn't exist. (${key})`)
            return res.error(404)
        }
        else if ( args.value && args.value !== config ) return res.error(404)
        else return next()
    }
}

module.exports = Config
