const { Model } = require('flitter-orm')
/**
 * Weekly Team Stat model
 * ---------------------------------------------------------------------------
 * A record containing the stats for a single team for a single lineup for a single week.
 *
 * @extends Model
 */
class WeeklyTeamStat extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    /**
     * defines the schema of the particular model
     */
    static get schema() {
        return {
            team_id: String,
            lineup_id: String,
            week_num: Number,
            player_ids: [String],
            fantasy_points: Number,
        }
    }
}

module.exports = exports = WeeklyTeamStat
