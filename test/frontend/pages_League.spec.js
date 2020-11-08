import { expect } from 'chai'
import sinon from 'sinon'
import LeagueComponent from '../../frontend/src/components/pages/League.component'

// Since we're testing code meant for the browser, not node, mock this
global.window = global
global.APP_BASE_PATH = 'http://fake.url/app/'

const get_inst = () => {
    return [new LeagueComponent()]
}

describe('the league page component', function() {
    it('should extend the component class', function() {
        expect(get_inst()[0]).to.be.an.instanceOf(LeagueComponent)
    })

    it('should show 3 columns for the main grid', function() {
        const [inst] = get_inst()

        expect(inst.column_defs.length).to.be.equal(3)
        expect(inst.column_defs.map(x => x.key)).to.be.eql([
            'standing', 'team_name', 'stats'
        ])
    })
})
