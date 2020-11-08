const { Injectable } = require('flitter-di')

/**
 * A data patch which fetches all of the player stats for a range of
 * weeks and creates WeeklyPlayerStat records for all players for all
 * weeks.
 *
 * This builds the base of data we need to calculate the weekly team
 * standings.
 *
 * @example
 * P = require('./app/SeedWeeklyPlayerData.patch')
 * p = _di.make(P)
 * await p.run()
 *
 * @extends Injectable
 */
class SeedWeeklyPlayerDataPatch extends Injectable {
    static get services() {
        return [...super.services, 'models', 'sports_data', 'output']
    }

    /**
     * Run the patch.
     * @return {Promise<void>}
     */
    async run() {
        const Player = this.models.get('Player')
        const WeeklyPlayerStat = this.models.get('WeeklyPlayerStat')
        const start_week = 1
        const end_week = 17

        // Clear existing data
        await WeeklyPlayerStat.deleteMany()

        // Array of players with week 1 stats
        const player_ids_with_week_1_stats = []

        // Populate the weekly player stats for all weeks in the range
        for ( let week = start_week; week <= end_week; week += 1 ) {
            this.output.info(`Building weekly player stats for week ${week}...`)
            const player_stats = await this.sports_data.get_week_player_stats(week)

            this.output.info(`    - processing ${player_stats.length} stats`)
            for ( const stat of player_stats ) {
                const player = await Player.findOne({
                    'patch_data.player_id': stat.PlayerID,
                })

                if ( player ) {
                    const weekly_stat = new WeeklyPlayerStat({
                        player_id: player.id,
                        patch_player_id: stat.PlayerID,
                        week_num: week,
                        fantasy_points: stat.FantasyPoints,

                        passing_attempts: stat.PassingAttempts,
                        passing_completions: stat.PassingCompletions,
                        passing_yards: stat.PassingYards,
                        fumbles: stat.Fumbles,
                        kick_returns: stat.KickReturns,
                        sacks: stat.Sacks,
                    })

                    await weekly_stat.save()

                    if ( week === 1 ) {
                        player_ids_with_week_1_stats.push(player.id)
                    }

                    if ( week === 1 || !player.seed_stats || Object.values(player.seed_stats).length < 1 ) {
                        player.seed_stats = await weekly_stat.to_api()
                    }
                } else {
                    this.output.warn(`      - Player ID ${stat.PlayerID} does not exist.`)
                }
            }
            this.output.success(`    - complete`)
        }

        this.output.info('Deactivating players without week 1 stats...')
        const inactive_players = await Player.find({
            _id: {
                $nin: player_ids_with_week_1_stats.map(x => Player.to_object_id(x)),
            },
        })

        this.output.info(`Deactivating ${inactive_players.length} players...`)
        for ( const player of inactive_players ) {
            player.is_active = false
            await player.save()
        }

        this.output.success('Complete!')
    }
}

module.exports = exports = SeedWeeklyPlayerDataPatch
