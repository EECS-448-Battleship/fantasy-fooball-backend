const { Injectable } = require('flitter-di')

/**
 * A one-time patch which populates the Player collection with
 * all the players on all the active teams in the NFL using the
 * sports data service's APIs.
 *
 * To run this, do it from "node flitter shell":
 *
 * @example
 * Patch = require('./app/SeedAPIData.patch')
 * patch = _di.make(Patch)
 * await patch.run()
 *
 * @extends Injectable
 */
class SeedAPIDataPatch extends Injectable {
    static get services() {
        return [...super.services, 'models', 'sports_data', 'output']
    }

    /**
     * Run the patch.
     * @return {Promise<void>}
     */
    async run() {
        // Clear any existing data first
        const Player = this.models.get('Player')
        await Player.deleteMany()
        this.output.success('Cleared existing player data!')

        // Fetch all active teams
        this.output.info('Fetching teams to patch data...')
        const teams = await this.sports_data.get_active_teams()
        this.output.info(`Fetched ${teams.length} teams.`)
        let players = 0

        // Fetch the players for each of the teams
        for ( let i = 0; i < teams.length; i++ ) {
            const team = teams[i]
            this.output.info(`Fetching players for team ${i + 1} of ${teams.length} (${team.Key})...`)

            const team_players = await this.sports_data.get_team_players(team.Key)
            this.output.info(`    (patching ${team_players.length} players)`)

            // Insert Player documents for each of the player records
            for ( const rec of team_players ) {
                const player = Player.from_patch_data(rec)
                player.patch_data.patch_team_name = team.FullName
                player.patch_data.patch_team_key = team.Key
                await player.save()
                players += 1
            }

            this.output.success(`    (patched player data)`)
        }

        this.output.success(`Patch complete. Created ${players} players.`)
    }
}

module.exports = exports = SeedAPIDataPatch
