import { expect } from 'chai'
import sinon from 'sinon'
import AddPlayersComponent from '../../frontend/src/components/pages/AddPlayers.component'

// Since we're testing code meant for the browser, not node, mock this
global.window = global
global.APP_BASE_PATH = 'http://fake.url/app/'

const get_inst = () => {
    return [new AddPlayersComponent(), [
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

describe('the add players page component', function() {
    it('should extend the component class', function() {
        expect(get_inst()[0]).to.be.an.instanceOf(AddPlayersComponent)
    })

    it('should quick-filter the players', function() {
        const [inst, players] = get_inst()

        inst.possible_players = players
        inst.quick_filter = 'lorem'

        inst.on_filter_change()

        expect(inst.filtered_players).to.be.an('array')
        expect(inst.filtered_players.length).to.be.equal(1)
        expect(inst.filtered_players[0]).to.be.eql({
            name: 'Lorem',
            position: 'Ipsum',
        })
    })

    it('should allow switching to my team only', function() {
        const [inst, players] = get_inst()
        const my_team = [players[1]]

        inst.all_players = players
        inst.my_team = my_team

        inst.to_my_team_only()

        expect(inst.possible_players).to.be.eql(my_team)
        expect(inst.my_team_only).to.be.true
    })

    it('should allow switching to view all players', function() {
        const [inst, players] = get_inst()
        const my_team = [players[1]]

        inst.all_players = players
        inst.my_team = my_team

        inst.to_all_players()

        expect(inst.possible_players).to.be.eql(players)
        expect(inst.my_team_only).to.be.false
    })

    it('should allow adding a player', function() {
        const [inst, players] = get_inst()

        inst.my_team = []

        inst.add_to_team(players[0])
        inst.add_to_team(players[0])
        inst.add_to_team(players[0])

        expect(inst.my_team.length).to.be.equal(1)
        expect(inst.my_team[0]).to.be.eql(players[0])
    })

    it('should allow removing a player', function() {
        const [inst, players] = get_inst()

        inst.my_team = [...players]
        const removed = [players[0], players[2]]

        inst.remove_from_team(players[1])
        inst.remove_from_team(players[1])
        inst.remove_from_team(players[1])

        expect(inst.my_team.length).to.be.equal(2)
        expect(inst.my_team).to.be.eql(removed)
    })
})
