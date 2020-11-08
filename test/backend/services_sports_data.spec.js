const { expect } = require('chai')
const sinon = require('sinon')
const SportsData = require('../../app/services/sports_data.service')

const get_inst = () => {
    const inst = new SportsData()
    const configs = {
        get(key) {
            return ({
                'server.sports_data.season': '2020REG',
                'server.sports_data.api_key': 'fakekey',
            })[key]
        }
    }

    inst.configs = configs
    return inst
}

describe('the sports data service', function() {
    it('should be a functional class instance', function() {
        expect(get_inst()).to.be.an.instanceOf(SportsData)
    })

    it('should properly format API URLs', function() {
        const inst = get_inst()

        let url = ''

        url = 'https://api.sportsdata.io/v3/nfl/scores/json/some-path/1?key=fakekey'
        expect(inst.url('some-path/1')).to.be.equal(url)

        url = 'https://api.sportsdata.io/v3/nfl/scores/json/some-path/other-path?key=fakekey'
        expect(inst.url('some-path/other-path')).to.be.equal(url)

        url = 'https://api.sportsdata.io/v3/nfl/fubar/json/some-path/another?key=fakekey'
        expect(inst.url('some-path/another', 'fubar')).to.be.equal(url)
    })

    it('should call the correct sportsdata.io endpoints', async function() {
        const inst = get_inst()

        const test_endpoint = async (method, endpoint, base, args = []) => {
            inst.get_request = sinon.spy()

            await inst[method](...args)

            expect(inst.get_request.calledOnce).to.be.true
            expect(inst.get_request.getCall(0).args[0]).to.be.equal(endpoint)
            expect(inst.get_request.getCall(0).args[1]).to.be.equal(base)
        }

        await test_endpoint('get_week_player_stats', 'PlayerGameProjectionStatsByWeek/2020REG/1', 'projections', [1])
        await test_endpoint('get_active_teams', 'Teams')
        await test_endpoint('get_team_players', 'Players/MYTEAM', undefined, ['MYTEAM'])
    })

    it('should have methods for is_draft_stage and current_play_week', function() {
        const inst = get_inst()

        expect(inst.is_draft_stage).to.be.a('function')
        expect(inst.is_draft_stage.length).to.be.equal(0)
        expect(inst.current_play_week).to.be.a('function')
        expect(inst.current_play_week.length).to.be.equal(0)
    })
})
