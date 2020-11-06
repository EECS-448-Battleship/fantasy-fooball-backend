const { Model } = require('flitter-orm')

/*
 * Team Model
 * -------------------------------------------------------------
 */
class Team extends Model {
    static get services() {
        return [...super.services, 'output', 'models']
    }

    /*
     * Define the flitter-orm schema of the model.
     */
    static get schema() {
        return {
            user_id: String,
            team_name: String,
            team_num: Number,
            player_ids: [String],
        }
    }

    /**
     * Look up or create a team for the given user.
     * @param {User} user
     * @return {Promise<Team>}
     */
    static async getForUser(user) {
        // try to find an existing team first
        const existing_team = await this.findOne({ user_id: user.id })
        if ( existing_team ) return existing_team

        // otherwise create a team for the user
        const new_team = new this({
            user_id: user.id,
            team_name: `${user.uid}'s team`,
            player_ids: [],
        })

        // Generate the next team number
        const highest_num_team = await this.sort('-team_num').findOne()
        if ( highest_num_team ) {
            new_team.team_num = highest_num_team.team_num + 1
        } else {
            new_team.team_num = 1
        }

        await new_team.save()
        return new_team
    }

    async lineup() {
        const Lineup = this.models.get('Lineup')
        return Lineup.get_and_update_for_team(this)
    }

    async players() {
        const Player = this.models.get('Player')
        return Player.find({
            _id: {
                $in: this.player_ids.map(x => Player.to_object_id(x))
            }
        })
    }

    async to_api() {
        const User = this.models.get('auth:User')

        return {
            user_id: this.user_id,
            user_display: (await User.findById(this.user_id))?.uid || 'Unknown User',
            team_name: this.team_name,
            team_num: this.team_num,
        }
    }
}

module.exports = exports = Team
