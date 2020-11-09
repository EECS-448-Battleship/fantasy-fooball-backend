const { expect } = require('chai')
const sinon = require('sinon')
const Matchup = require('../../app/models/Matchup.model')
const { Model } = require('flitter-orm')

describe('the matchup model', function() {
    it('should should extend Model', function() {
        expect(new Matchup).to.be.an.instanceOf(Model)
    })

    it('should format Matchuo for the API', async function(){
        const Matchup = new Matchup({
            home_team_id: 'test home team',
            visitor_team_id: 'test visitor team',
            week_num: 4,
            complete: { type: Boolean, default: false },
            //not sure about above line
            home_team_score: 20,
            visitor_team_score: 21,
        })
        expect(await Matchup.to_api()).to.be.eql({

        })

    })
})