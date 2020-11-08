const { Injectable } = require('flitter-di')

/**
 * GenerateWeeklyResultsPatch
 * @extends Injectable
 * ----------------------------------------------------------------------------
 */
class GenerateWeeklyResultsPatch extends Injectable {
    static get services() {
        return [...super.services, 'models', 'sports_data']
    }

    /**
     * Runs the patch
     * @returns {Promise<void>}
     */
    async run() {
        const Matchup = this.models.get('Matchup')
        const current_week = await this.sports_data.current_play_week()

        const week_matchups = await Matchup.find({ week_num: current_week })
        this.output.info(`Processing ${week_matchups.length} matchups...`)

        for ( const matchup of week_matchups ) {
            const visitor_team = await matchup.visitor_team()
            const home_team = await matchup.home_team()

            const visitor_lineup = await visitor_team.lineup()
            const home_lineup = await home_team.lineup()

            matchup.visitor_team_score = await visitor_lineup.calculate_fantasy_points()
            matchup.home_team_score = await home_lineup.calculate_fantasy_points()
            matchup.complete = true

            this.output.success(`Scored matchup ${matchup.id}`)
            this.output.info(`  Team ${home_team.id}: ${matchup.home_team_score}`)
            this.output.info(`  Team ${visitor_team.id}: ${matchup.visitor_team_score}`)
            await matchup.save()
        }

        this.output.info('Finished scoring match-ups.')
    }
}

module.exports = exports = GenerateWeeklyResultsPatch
