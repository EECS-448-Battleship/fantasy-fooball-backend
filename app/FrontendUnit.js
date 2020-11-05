const Unit = require('libflitter/Unit')
const Express = require('express')
const path = require('path')

class FrontendUnit extends Unit {
    static get services() {
        return [...super.services, 'configs', 'express', 'canon', 'utility']
    }

    constructor(...args) {
        super(...args)

        /**
         * Fully qualified path to the root of the ionic app.
         * @type {string}
         */
        this.directory = this.utility.path(this.configs.get('server.frontend_path'))
    }

    async go(app) {
        app.express.use('/app', [
            this.canon.get('middleware::auth:UserOnly'),
            (req, res, next) => {
                if ( !req.user ) {
                    return res.redirect('/auth/login')
                }

                const allowed_extensions = [
                    '.html', '.js', '.css', '.svg', '.ttf', '.jpg', '.png',
                    '.jpeg', '.webmanifest', '.json', '.eot', '.svg', '.cur',
                    '.webp', '.gif', '.otf', '.woff', '.woff2', '.ani', '.map',
                    '.ico',
                ]

                for ( const k1 in allowed_extensions ) {
                    if ( req.path.endsWith(allowed_extensions[k1]) ) return next()
                }

                return res.sendFile(path.resolve(this.directory, 'index.html'))
            },
            Express.static(this.directory),
        ])
    }
}

module.exports = exports = FrontendUnit
