const { Model } = require('flitter-orm')

/*
 * Example Model
 * -------------------------------------------------------------
 * This is a sample model. The schema or structure of the model should
 * be specified here. It is then passed to flitter-orm and can be accessed
 * globally using the canonical models service.
 */
class Example extends Model {
    static get services() {
        return [...super.services, 'output']
    }

    /*
     * Define the flitter-orm schema of the model.
     */
    static get schema() {
        return {
            name: String,
            create_date: {type: Date, default: () => new Date},
        }
    }

    log_name() {
        this.output.info(`[Example Model] ${this.name}`)
    }
}

module.exports = exports = Example
