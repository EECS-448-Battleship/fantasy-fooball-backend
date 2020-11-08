import { expect } from 'chai'
import sinon from 'sinon'
import ScoresComponent from '../../frontend/src/components/pages/Scores.component'

// Since we're testing code meant for the browser, not node, mock this
global.window = global
global.APP_BASE_PATH = 'http://fake.url/app/'

const get_inst = () => {
    return [new ScoresComponent()]
}

describe('the my team page component', function() {
    it('should extend the component class', function() {
        expect(get_inst()[0]).to.be.an.instanceOf(ScoresComponent)
    })

    it('should default to the first week', function() {
        const [inst] = get_inst()

        expect(inst.current_week).to.be.equal(1)
        expect(inst.max_week).to.be.equal(1)
        expect(inst.min_week).to.be.equal(1)
    })

    it('should show 4 columns in the standings grid', function() {
        const [inst] = get_inst()

        expect(inst.column_defs.length).to.be.equal(4)
        expect(inst.column_defs.map(x => x.key)).to.be.eql([
            'date', 'team_1', 'team_2', 'winner'
        ])
    })

    it('should allow advancing the week until we hit the max', function() {
        const [inst] = get_inst()
        inst.max_week = 4

        expect(inst.current_week).to.be.equal(1)

        inst.to_next_week()
        expect(inst.current_week).to.be.equal(2)

        inst.to_next_week()
        expect(inst.current_week).to.be.equal(3)

        inst.to_next_week()
        expect(inst.current_week).to.be.equal(4)

        inst.to_next_week()
        expect(inst.current_week).to.be.equal(4)

        inst.to_next_week()
        expect(inst.current_week).to.be.equal(4)
    })

    it('should allow un-advancing the week until we hit the min', function() {
        const [inst] = get_inst()
        inst.max_week = 4
        inst.current_week = 4

        inst.to_previous_week()
        expect(inst.current_week).to.be.equal(3)

        inst.to_previous_week()
        expect(inst.current_week).to.be.equal(2)

        inst.to_previous_week()
        expect(inst.current_week).to.be.equal(1)

        inst.to_previous_week()
        expect(inst.current_week).to.be.equal(1)

        inst.to_previous_week()
        expect(inst.current_week).to.be.equal(1)
    })
})
