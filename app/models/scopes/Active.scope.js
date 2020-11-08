const Scope = require('flitter-orm/src/model/Scope')

/**
 * This is a model scope which excludes any models without is_active = true.
 * In effect, this provides a mechanism for soft-deletes.
 *
 * @extends Scope
 */
class ActiveScope extends Scope {
    /**
     * Apply this scope's conditions to a model filter.
     * @param to_filter
     * @return {Promise<*>}
     */
    async filter(to_filter) {
        return to_filter.equal('is_active', true)
    }
}

module.exports = exports = ActiveScope
