const { expect } = require('chai')
const sinon = require('sinon')

describe('the API routes', function() {
    it('should define the correct public API', function() {
        const config = require('../../app/routing/routers/api.routes')
        expect(config).to.be.eql({
            prefix: '/api/v1',
            middleware: [ 'auth:UserOnly', 'InjectUserTeam' ],
            get: {
                '/my-team': ['controller::Teams.get_my_team'],
                '/my-team/players': ['controller::Teams.get_my_team_players'],
                '/my-team/lineup': ['controller::Teams.get_my_team_current_lineup'],
                '/draft-board/available': ['controller::DraftBoard.get_available_players'],
                '/matchups': ['controller::Scores.get_weekly_scores'],
                '/league-standings': ['controller::Scores.get_league_standings'],
                '/status': ['controller::Home.get_status'],
            },
            post: {
                '/my-team': ['controller::Teams.save_my_team'],
                '/my-team/lineup': ['controller::Teams.save_my_team_lineup'],
                '/draft-board/draft-player': ['controller::DraftBoard.draft_player_to_team'],
            },
        })
    })
})
