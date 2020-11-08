const { expect } = require('chai')
const sinon = require('sinon')
const WeeklyPlayerStat = require('../../app/models/WeeklyPlayerStat.model')
const { Model } = require('flitter-orm')

describe('the weekly player stat model', function() {
    it('should extend Model', function() {
        expect(new WeeklyPlayerStat).to.be.an.instanceOf(Model)
    })

    it('should format stats for the API', async function() {
        const stat = new WeeklyPlayerStat({
            player_id: 1,
            week_num: 1,
            patch_player_id: 1,
            fantasy_points: 3,

            passing_attempts: 4,
            passing_completions: 2,
            passing_yards: 50,
            fumbles: 2,
            kick_returns: 1,
            sacks: 0,
        })

        expect(await stat.to_api()).to.be.eql({
            'Passing Attempts': 4,
            'Passing Completions': 2,
            'Passing Yards': 50,
            'Fumbles': 2,
            'Kick Returns': 1,
            'Sacks': 0,
        })
    })
})
