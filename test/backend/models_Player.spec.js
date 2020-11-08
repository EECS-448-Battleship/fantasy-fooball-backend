const { expect } = require('chai')
const sinon = require('sinon')
const Player = require('../../app/models/Player.model')
const { Model } = require('flitter-orm')

describe('the player model', function() {
    it('should extend Model', function() {
        expect(new Player).to.be.an.instanceOf(Model)
    })

    it('should format players for the API', async function() {
        const player = new Player({
            patch_data: {
                patch_team_id: 4,
                patch_team_name: 'Test team',
                patch_team_key: 'TTM',
            },
            player_number: 34,
            first_name: 'Test',
            last_name: 'Player',
            full_name: 'A Test Player',
            position: 'QB',
            fantasy_position: 'QB',
            height: '6\'4"',
            weight: 250,
            birthday: '2020-11-11',
            experience: 0,
            experience_string: 'rookie',
            age: 21,
            photo_url: 'http://image.com/img.png',
        })

        expect(await player.to_api()).to.be.eql({
            id: undefined,
            number: 34,
            name: 'A Test Player',
            position: 'QB',
            team_name: 'Test team',
            image: 'http://image.com/img.png',
            stats: {},
        })
    })
})
