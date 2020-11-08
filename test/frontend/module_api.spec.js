import { expect } from 'chai'
import sinon from 'sinon'
import {api} from '../../frontend/src/module/api'

// Since we're testing code meant for the browser, not node, mock this
global.window = global

api.base_url = 'http://fake.url/api/v1/'

describe('the api helper class', function() {
    it('should be a functional class', function() {
        expect(api).to.exist
    })

    it('should build URLs using the APP BASE URL', function() {
        expect(api.build_url('my-team', 'lineup')).to.be.equal('http://fake.url/api/v1/my-team/lineup')
        expect(api.build_url('league')).to.be.equal('http://fake.url/api/v1/league')
    })

    it('should call the correct GET endpoints', async function() {
        const old = api.get_request

        const test_endpoint = async (method, endp) => {
            api.get_request = sinon.spy()
            await api[method]()

            expect(api.get_request.calledOnce).to.be.true
            expect(api.get_request.getCall(0).args[0]).to.be.equal(endp)
        }

        await test_endpoint('get_status', 'status')
        await test_endpoint('get_standings', 'league-standings')
        await test_endpoint('get_matchups', 'matchups')
        await test_endpoint('get_available_draft_players', 'draft-board/available')
        await test_endpoint('get_my_team', 'my-team')
        await test_endpoint('get_my_team_players', 'my-team/players')
        await test_endpoint('get_my_team_current_lineup', 'my-team/lineup')

        api.get_request = old
    })

    it('should call the correct POST endpoints', async function() {
        const old = api.post_request

        const test_endpoint = async (method, endp, args = [], data = {}) => {
            api.post_request = sinon.spy()
            await api[method](...args)

            expect(api.post_request.calledOnce).to.be.true
            expect(api.post_request.getCall(0).args[0]).to.be.equal(endp)
            expect(api.post_request.getCall(0).args[1]).to.be.eql(data)
        }

        await test_endpoint('draft_player', 'draft-board/draft-player', [394588], { player_id: 394588 })
        await test_endpoint('save_my_team', 'my-team', [{ fubar: 394588 }], { fubar: 394588 })
        await test_endpoint('save_my_team_lineup', 'my-team/lineup', [{ fubar: 123583 }], { fubar: 123583 })
    })
})
