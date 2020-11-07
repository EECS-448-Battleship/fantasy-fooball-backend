const { Injectable } = require('flitter-di')

/**
 * Generates the matchups for the current week by scheduling teams
 * to play, first any team they haven't already played, or a random
 * team.
 *
 * @example
 * P = require('./app/GenerateMatchupsForWeek.patch')
 * p = _di.make(P)
 * await p.run()
 *
 * @extends Injectable
 */
class GenerateMatchupsForWeekPatch extends Injectable {
    static get services() {
        return [...super.services, 'models', 'sports_data', 'output']
    }

    async run() {
        const Team = this.models.get('Team')
        const Matchup = this.models.get('Matchup')
        const current_week = await this.sports_data.current_play_week()

        // clear any existing data
        const old_matchups = await Matchup.find({ week_num: current_week })
        if ( old_matchups.length ) {
            this.output.info('Purging old data.')
            await Promise.all(old_matchups.map(x => x.delete()))
        }

        const all_teams = await Team.find()
        const matchups = []
        const scheduled_team_ids = []
        const home_team = current_week % 2 === 0

        this.output.info(`Generating matchups for week ${current_week} for ${all_teams.length} teams...`)

        for ( const team of all_teams ) {
            this.output.debug(`Scheduled team IDs: ${scheduled_team_ids.join(', ')}`)
            this.output.info(`Scheduling team ${team.id}`)

            // If we've already scheduled this team, don't do it twice
            if ( scheduled_team_ids.includes(team.id) ) continue

            // Otherwise, try to schedule the team to play a team they haven't already matched
            const played_team_ids = await this.get_teams_played_by_team(team)

            let matchup;
            for ( const other_team of all_teams ) {
                // Only schedule a matchup if:
                //   - we haven't played this team
                //   - we haven't scheduled this team for this week already
                //   - this isn't the same team
                if (
                    team.id !== other_team.id
                    && !played_team_ids.includes(other_team.id)
                    && !scheduled_team_ids.includes(other_team.id)
                ) {
                    // We haven't played this team yet, so schedule a matchup
                    matchup = new Matchup({
                        week_num: current_week
                    })

                    // Switch who's home/visitor based on the week number
                    if ( home_team ) {
                        matchup.home_team_id = team.id
                        matchup.visitor_team_id = other_team.id
                    } else {
                        matchup.home_team_id = other_team.id
                        matchup.visitor_team_id = team.id
                    }
                }
            }

            if ( !matchup ) {
                // We've played all teams, so just try to pick a random one.
                const other_team = all_teams.filter(x => {
                    return !scheduled_team_ids.includes(x.id) && x.id !== team.id
                })[Math.floor(Math.random() * all_teams.length)]

                // We might not have an available team this week
                if ( other_team ) {
                    matchup = new Matchup({
                        week_num: current_week
                    })

                    if (home_team) {
                        matchup.home_team_id = team.id
                        matchup.visitor_team_id = other_team.id
                    } else {
                        matchup.home_team_id = other_team.id
                        matchup.visitor_team_id = team.id
                    }
                }
            }

            // Uh, oh. We couldn't generate a matchup for this team
            if ( !matchup ) {
                this.output.warn(`  - Team ${team.id} will be BYE`)
                continue
            }

            // We generated a matchup for this team
            this.output.success(`  - Team ${matchup.visitor_team_id} will play at ${matchup.home_team_id}`)
            scheduled_team_ids.push(matchup.home_team_id)
            scheduled_team_ids.push(matchup.visitor_team_id)
            matchups.push(matchup)
        }

        await Promise.all(matchups.map(x => x.save()))
        this.output.success('Complete.')
    }

    async get_teams_played_by_team(team) {
        const Matchup = this.models.get('Matchup')
        const home_games = await Matchup.find({ home_team_id: team.id })
        const visitor_games = await Matchup.find({ visitor_team_id: team.id })

        return [...home_games.map(x => x.visitor_team_id), ...visitor_games.map(x => x.home_team_id)]
    }
}

module.exports = GenerateMatchupsForWeekPatch
