const { Controller } = require('libflitter')
/**
 * ScoresController
 * @extends Controller
 * ----------------------------------------------------------------------
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

        for ( let i = 1; i <= current_week; i += 1 ) {
            const matchups = await Matchup.find({ week_num: i })
            const api_data = await Promise.all(matchups.map(x => x.to_api()))
            weekly_data.push(api_data)
        }

        return res.api(weekly_data)
    }
}

module.exports = exports = ScoresController
