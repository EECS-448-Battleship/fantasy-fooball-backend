/*
 * Load the units file.
 * -------------------------------------------------------------
 * This file contains an ordered object of unit files. Flitter will load these
 * one at a time to launch the application. Each unit in the sequence is passed
 * the function for the next unit in the sequence. This forms the function stack
 * by chaining the units together, ending with the Flitter App unit.
 */
const units = require('./Units.flitter')

const { FlitterApp, RunLevelErrorHandler } = require('libflitter')

/*
 * Create the app.
 * -------------------------------------------------------------
 * The FlitterApp object contains the wrapper for the Express app, as well as
 * the initialization function that chains together the individual units. This
 * is why we pass it the units.
 */
const flitter = new FlitterApp(units)

/*
 * Create the error handler.
 * -------------------------------------------------------------
 * The run-level error handler is responsible for dealing with errors that make
 * it all the way to the top level of the running app. Most of the time, routing
 * errors are handled by the router and result in some kind of error page showing
 * to the user.
 *
 * The errors handled by the RLEH are structural errors that are problems with the
 * application itself.
 */
const rleh = new RunLevelErrorHandler()

/*
 * Launch the server.
 * -------------------------------------------------------------
 * This calls the first unit in the unit chain. This chain ends with the Flitter
 * server component which launches the Node HTTP server.
 *
 * Calls up() and down().
 */
flitter.run().catch(rleh.handle)
