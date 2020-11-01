/*
 * The Flitter Units File
 * -------------------------------------------------------------
 * Flitter uses a unit-chain style initialization system. This means that
 * individual components of Flitter and its add-ons are specified in order
 * here. Then, when the app is created, Flitter creates a single functional
 * chain by passing the next unit to the current unit's loading script. This
 * launches Flitter with a single function call (FlitterApp.up()) and enables
 * developers to contextualize Flitter within async or callback functions.
 */
const FlitterUnits = {

    /*
     * The Core Flitter Units
     * -------------------------------------------------------------
     * These units comprise the core functionality of Flitter. Unless you
     * really know what you are doing, you should NEVER change them.
     */
    'Canon'         : require('libflitter/canon/CanonicalAccessUnit'),
    'Services'      : require('libflitter/services/ServicesUnit'),
    'Config'        : require('libflitter/config/ConfigUnit'),
    'Utility'       : require('libflitter/utility/UtilityUnit'),
    'Database'      : require('libflitter/database/DatabaseUnit'),
    'Models'        : require('libflitter/database/DatabaseModelsUnit'),
    'Express'       : require('libflitter/express/ExpressUnit'),
    'ViewEngine'    : require('libflitter/views/ViewEngineUnit'),

    /*
     * Pre-Routing Custom Units
     * -------------------------------------------------------------
     * Custom units that modify or add functionality that needs to be made
     * available to the middleware-routing-controller stack.
     */
    'Locale'        : require('flitter-i18n/src/LocaleUnit'),
    'Upload'        : require('flitter-upload/UploadUnit'),

    /*
     * The Core Flitter Units
     * -------------------------------------------------------------
     * These units comprise the core functionality of Flitter. Unless you
     * really know what you are doing, you should NEVER change them.
     */
    'Middleware'    : require('libflitter/middleware/MiddlewareUnit'),
    'Controller'    : require('libflitter/controller/ControllerUnit'),
    'Routing'       : require('libflitter/routing/RoutingUnit'),
    'Static'        : require('libflitter/static/StaticUnit'),

    /*
     * Secondary Flitter Units
     * -------------------------------------------------------------
     * These units aren't strictly required for the core functionality of
     * Flitter, but they enable the use of certain Flitter tools, like the
     * ./flitter command and its handlers.
     */
    'Forms'         : require('flitter-forms/FormsUnit'),
    'Auth'          : require('flitter-auth/AuthUnit'),
    'Flap'          : require('flitter-flap/FlapUnit'),

    /*
     * Custom Flitter Units
     * -------------------------------------------------------------
     * Custom units should be specified here. They will be loaded in order
     * after the core of Flitter has been initialized.
     */
    // 'CustomUnit'     : new CustomUnit(),

    /*
     * HTTP Error Handling
     * -------------------------------------------------------------
     * This unit provides default routes for invalid requests and tags them as
     * 404 errors. It also provides middleware to display error views according
     * to their HTTP status code. This allows for custom views which are located
     * in views/errors/.
     */
    'Error'         : require('libflitter/errors/ErrorUnit'),

    /*
     * The Flitter App Unit
     * -------------------------------------------------------------
     * This should ALWAYS be the last unit to run. The app unit contains the
     * call to the Node HTTP server that launches Flitter. Units listed after
     * the app unit are in an lower context than the Flitter app and therefore
     * won't be available to Flitter or the underlying Express framework.
     */
    'Cli'           : require('flitter-cli/CliUnit'),
    'App'           : require('libflitter/app/AppUnit'),
}

module.exports = exports = FlitterUnits
