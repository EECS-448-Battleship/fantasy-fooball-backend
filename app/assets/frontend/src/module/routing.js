/** @module routing */

/**
 * A bare-bones history-api based SPA router.
 */
class Router {
    /**
     * Arguments for the current route.
     * @type {undefined|*}
     */
    route_args = undefined

    /**
     * List of callback functions listening for route changes.
     * @type {function[]}
     */
    subscribers = []

    /**
     * Array of router history records.
     * @type {object[]}
     */
    history = []

    /**
     * Returns the APP_BASE_PATH of the application.
     * @return {string}
     */
    get base_path() {
        return APP_BASE_PATH
    }

    /**
     * Navigate the app to the given path with the given args.
     * @param {string} path
     * @param {*} args
     */
    navigate(path, args) {
        this.route_args = args
        this.history.push({path, args})
        window.history.pushState({}, path, this.build_url(path))
        this.subscribers.forEach(sub => sub(path, args))
    }

    /**
     * Navigate back one route.
     */
    back() {
        window.history.back()
        if ( this.history.length < 2 ) return;
        this.history.pop()
        const { path, args } = this.history[this.history.length - 1]
        this.subscribers.forEach(sub => sub(path, args))
    }

    /**
     * Subscribe to listen for route changes. Returns an object with an unsubscribe() property.
     * @param {function} handler - callback called when the route changes
     * @return {object} - subscription manager
     */
    subscribe(handler) {
        if ( !this.subscribers.includes(handler) ) {
            this.subscribers.push(handler)
        }

        return {
            unsubscribe: () => {
                this.subscribers = this.subscribers.filter(handler)
            }
        }
    }

    /**
     * Given an array of route parts, build a joined URL route.
     * @param {...string} parts
     * @return {string}
     */
    build_url(...parts) {
        parts = [this.base_path, ...parts].map(part => {
            if ( part.endsWith('/') ) part = part.slice(0, -1)
            if ( part.startsWith('/') ) part = part.slice(1)
            return part
        })

        return parts.join('/')
    }
}

/**
 * Global router instance.
 * @type {Router}
 */
const router = new Router()
export { router }
