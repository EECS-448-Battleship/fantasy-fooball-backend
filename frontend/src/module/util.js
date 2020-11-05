/** @module util */

/**
 * Makes a deep copy of the value passed in.
 * @param {*} obj
 * @return {*}
 */
export function clone(obj) {
    // If it's just a value, return it.
    if ( typeof obj !== 'object' || obj === null ) return obj

    // If it's an array, copy its values.
    if ( Array.isArray(obj) ) return obj.map(x => clone(x))

    // If it's an object, copy its properties.
    const copy = {}
    for ( const prop in obj ) {
        copy[prop] = clone(obj[prop])
    }
    return copy
}

/**
 * Generate an absolute URL to a file w/in the project directory.
 * @param {string} path
 * @return {string}
 */
export function appUrl(path) {
    if ( path.startsWith('/') ) path = path.slice(1)
    return `${APP_BASE_PATH}${path}`
}

/**
 * Generates a UUIDv4. Taken from: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * @return {string}
 */
export function uuid_v4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
