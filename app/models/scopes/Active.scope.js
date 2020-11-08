const Scope = require('flitter-orm/src/model/Scope')

class ActiveScope extends Scope {
    async filter(to_filter) {
        return to_filter.equal('is_active', true)
    }
}

module.exports = exports = ActiveScope
