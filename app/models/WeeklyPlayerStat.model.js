const { Model } = require('flitter-orm')
/**
 * WeeklyPlayerStat model
 * @extends Model
 * -----------------------------------------------------------------------
 */
class WeeklyPlayerStat extends Model {
    static get services() {
        return [...super.services, 'models']
    }

    /**
     * defines the schema of the particular model
     */
    static get schema() {
        return {
            player_id: String,
            week_num: Number,
            patch_player_id: String,
            fantasy_points: Number,

            passing_attempts: Number,
            passing_completions: Number,
            passing_yards: Number,
            fumbles: Number,
            kick_returns: Number,
            sacks: Number,
        }
    }

    /**
     * updates the API's data
     */
    async to_api() {
        return {
            'Passing Attempts': this.passing_attempts,
            'Passing Completions': this.passing_completions,
            'Passing Yards': this.passing_yards,
            'Fumbles': this.fumbles,
            'Kick Returns': this.kick_returns,
            'Sacks': this.sacks,
        }
    }
}

module.exports = exports = WeeklyPlayerStat
