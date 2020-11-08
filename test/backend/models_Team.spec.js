const { expect } = require('chai')
const sinon = require('sinon')
const Team = require('../../app/models/Team.model')
const { Model } = require('flitter-orm')

describe('the team model', function() {
    it('should extend Model', function() {
        expect(new Team).to.be.an.instanceOf(Model)
    })

    it('should format teams for the API', async function() {
        const team = new Team({
            user_id: '45c',
            team_name: 'A test team name',
            team_num: 44,
            player_ids: ['abc', '123'],
        })

        expect(await team.to_api()).to.be.eql({
            user_id: '45c',
            user_display: 'Unknown User',
            team_name: 'A test team name',
            team_num: 44,
        })
    })
})
