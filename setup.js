const SeedAPIData = require('./app/SeedAPIData.patch')
const SeedWeeklyPlayerData = require('./app/SeedWeeklyPlayerData.patch')

/**
 * Helper function for seeding the initial database data.
 * @type {exports}
 */
module.exports = exports = async function(di) {
    const api_patch = di.make(SeedAPIData)
    await api_patch.run()

    const player_patch = di.make(SeedWeeklyPlayerData)
    await player_patch.run()
}
