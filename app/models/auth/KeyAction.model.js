const Model = require('flitter-auth/model/KeyAction')

/*
 * KeyAction Model
 * -------------------------------------------------------------
 * Represents a single available key action. Key actions
 * are one-time use links that directly call a method on
 * a controller. These actions:
 *
 * - Can pass along context
 * - Have expiration dates
 * - Are single-use only
 * - Can automatically log in a user during the request lifecycle
 *
 * You can generate these actions using the request.security.keyaction()
 * method.
 *
 * See: module:flitter-auth/SecurityContext~SecurityContext#keyaction
 * See: module:flitter-auth/model/KeyAction~KeyAction
 */
class KeyAction extends Model {

}

module.exports = exports = KeyAction
