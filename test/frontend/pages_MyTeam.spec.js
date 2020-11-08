import { expect } from 'chai'
import sinon from 'sinon'
import MyTeamComponent from '../../frontend/src/components/pages/MyTeam.component'

// Since we're testing code meant for the browser, not node, mock this
global.window = global
global.APP_BASE_PATH = 'http://fake.url/app/'

const get_inst = () => {
    return [new MyTeamComponent()]
}

describe('the my team page component', function() {
    it('should extend the component class', function() {
        expect(get_inst()[0]).to.be.an.instanceOf(MyTeamComponent)
    })

    it('should show 3 columns for the lineup grids', function() {
        const [inst] = get_inst()

        expect(inst.lineup_column_defs.length).to.be.equal(3)
        expect(inst.lineup_column_defs.map(x => x.key)).to.be.eql([
            'position', 'name', 'name'
        ])
    })

    it('should show 3 columns for the overall column definitions', function() {
        const [inst] = get_inst()

        expect(inst.overall_column_defs.length).to.be.equal(3)
        expect(inst.overall_column_defs.map(x => x.key)).to.be.eql([
            'name', 'position', 'ecr',
        ])
    })

    it('should change the save text on mark_dirty', function() {
        const [inst] = get_inst()
        const original = inst.save_text

        inst.mark_dirty()

        expect(inst.save_text).to.not.equal(original)
    })

    it('should change the save text on team name change', function() {
        const [inst] = get_inst()
        const original = inst.save_text

        inst.team_name = 'something else!'
        inst.watch_team_name()

        expect(inst.save_text).to.not.equal(original)
    })
})
