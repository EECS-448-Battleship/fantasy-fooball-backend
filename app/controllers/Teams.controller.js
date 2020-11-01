const { Controller } = require('libflitter')

/*
 * Teams Controller
 * -------------------------------------------------------------
 */
class Teams extends Controller {
    static get services() {
        return [...super.services, 'models']
    }

    async list_all_teams(req, res) {
        const TeamModel = this.models.get('Team')
        const teams = await TeamModel.find()
        return res.api(teams)
    }

    async create_team(req, res) {
        const TeamModel = this.models.get('Team')

        if ( !req.body.team_name || !req.body.team_num ) {
            return res.status(400)
                .message('Missing team_name or team_num')
                .api()
        }

        const duplicate_team = await TeamModel.findOne({
            team_num: req.body.team_num,
        })

        if ( duplicate_team ) {
            return res.status(400)
                .message('That team number is already in use!')
                .api()
        }

        const team = new TeamModel({
            team_name: req.body.team_name,
            team_num: req.body.team_num,
        })

        await team.save()
        return res.api(team)
    }
}

module.exports = Teams
