
// boot the framework for use in testing
const framework$ = (function() {
    class FrameworkLoader {
        listeners = []
        booted = false

        subscribe(handler) {
            if ( !this.booted ) this.listeners.push(handler)
            else handler()
        }

        boot() {
            const units = require('../../Units.flitter')
            delete units.App
            const { FlitterApp, RunLevelErrorHandler } = require('libflitter')
            this.flitter = new FlitterApp(units)
            this.rleh = new RunLevelErrorHandler()

            this.flitter.up().then(() => {
                this.booted = true
                for ( const listener of this.listeners ) {
                    try {
                        listener()
                    } catch (e) {}
                }
            })
        }

        stop() {
            return this.flitter.down()
        }
    }

    return new FrameworkLoader()
})()

module.exports = exports = framework$
