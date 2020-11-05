const Controller = require('flitter-auth/controllers/KeyAction')

/*
 * KeyAction Controller
 * -------------------------------------------------------------
 * Provides handler methods for flitter-auth's key actions.
 * Key actions allow your application to dynamically generate
 * one-time links that call methods on controllers and (optionally)
 * can even automatically sign in a user for the request, then log
 * them out. e.g. a password reset link could use a key action.
 */
class KeyAction extends Controller {

}

module.exports = exports = KeyAction