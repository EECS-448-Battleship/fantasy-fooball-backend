const { expect } = require('chai')
const sinon = require('sinon')
const Lineup = require('../../app/models/Lineup.model')
const { Model } = require('flitter-orm')

describe('the lineup model', function() {
    it('should extend Model', function() {
        expect(new Lineup).to.be.an.instanceOf(Model)
    })

    it('should format the lineup for the API', async function() {
        const lineup = new lineup({
            team_id: 'test team id',
            benched_player_ids: ['test benched player'],
            starting_players: [{
                player_id: 'test player id',
                position: 'QB',
            }],
            active: { type: Boolean, default: true},
            //unsure about above line 
            week_num: '6',
        })
        expect(await lineup.to_api()).to.be.eql({
            //not absolutely sure about this one
            team_id: undefined,
            active: undefined,
            //not surea bout above, either
            week_num: 5,
        })
    })
})