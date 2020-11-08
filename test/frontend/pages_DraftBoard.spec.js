import { expect } from 'chai'
import sinon from 'sinon'
import DraftBoardComponent from '../../frontend/src/components/pages/DraftBoard.component'

// Since we're testing code meant for the browser, not node, mock this
global.window = global
global.APP_BASE_PATH = 'http://fake.url/app/'

const get_inst = () => {
    return [new DraftBoardComponent(), [
        {
            name: 'Lorem',
            position: 'Ipsum',
        },
        {
            name: 'Dolor',
            position: 'Sit',
        },
        {
            name: 'Amet',
            position: 'Fubar',
        },
    ]]
}

describe('the draft board page component', function() {
    it('should extend the component class', function() {
        expect(get_inst()[0]).to.be.an.instanceOf(DraftBoardComponent)
    })

    it('should show one column for the top picks grid', function() {
        const [inst, players] = get_inst()

        expect(inst.top_picks_column_defs.length).to.be.equal(1)
        expect(inst.top_picks_column_defs[0].key).to.be.equal('name')
    })

    it('should show 6 columns for the draft board grid', function() {
        const [inst, players] = get_inst()

        expect(inst.column_defs.length).to.be.equal(6)
        expect(inst.column_defs.map(x => x.key)).to.be.eql([
            'name', 'team_name', 'position', 'points', 'stats', 'stats',
        ])
    })
})
