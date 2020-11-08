const { Controller } = require('libflitter')

/**
 * ScoresController
 * ----------------------------------------------------------------------
 * This controller contains logic for handling API requests related to the
 * weekly scores and matchups endpoints.
 *
 * @extends Controller
 */
class ScoresController extends Controller {
    static get services() {
        return [...super.services, 'models', 'sports_data']
    }

    /**
     * Returns the weekly scores
     * @param  req 
     * @param  res 
     * @param  next 
     * @returns
     */
    async get_weekly_scores(req, res, next) {
        const Matchup = this.models.get('Matchup')

        const current_week = await this.sports_data.current_play_week()
        const weekly_data = []

        // Convert all of the matchup instances to API format for each week
        for ( let i = 1; i <= current_week; i += 1 ) {
            const matchups = await Matchup.find({ week_num: i })
            const api_data = await Promise.all(matchups.map(x => x.to_api()))
            weekly_data.push(api_data)
        }

        return res.api(weekly_data)
    }

    /**
     * Returns the league standings with calculated stats
     * @param req
     * @param res
     * @param next
     * @return {Promise<Array<object>>}
     */
    async get_league_standings(req, res, next) {
        const Team = this.models.get('Team')
        const all_teams = await Team.find()
        const stat_records = []

        // Generate the cumulative team data for all teams
        for ( const team of all_teams ) {
            const rec = await team.cumulative_data()
            rec.team_name = team.team_name
            stat_records.push(rec)
        }

        // Sort the teams by number of wins, then number of points scored
        stat_records.sort((a, b) => {
            if ( a.wins === b.wins ) {
                return a.points_scored - b.points_scored
            }

            return a.wins > b.wins ? 1 : -1
        })

        // Return the records in a format compatible with the front-end
        return res.api(stat_records.map((x, i) => {
            return {
                standing: {
                    rank: i + 1,
                    win_loss: `${x.wins}/${x.losses}`,
                },
                team_name: x.team_name,
                stats: [
                    { name: 'Total Points Scored', value: x.points_scored },
                    { name: 'Total Points Allowed', value: x.points_allowed },
                ],
            }
        }))
    }
}

module.exports = exports = ScoresController
