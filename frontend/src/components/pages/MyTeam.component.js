import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'
import {api} from '../../module/api.js'

const template = `
<div class="page-my-team">
    <div class="header">
        <div class="left team-name">
            <h2>My Team - </h2><input placeholder="Click to edit team name..." type="text" v-model="team_name">
        </div>
        <div class="right">
            <span class="save-text" style="margin-right: 20px; color: #555555; font-style: italic;">{{ save_text }}</span><button @click="save_changes()">Save</button>
        </div>
    </div>
    <div class="body" style="display: flex; flex-direction: row; margin-left: 10px; padding-bottom: 50px;" v-if="show_body">
        <app-grid
            :column_defs="overall_column_defs"
            :data="overall_data"
            :show_row_numbers="true"
            style="flex: 1;"
        ></app-grid>
        <div class="lineup-grids" style="margin-left: 30px; margin-right: 10px; flex: 1;">
            <h3>Starting Lineup</h3>
            <app-grid
                :column_defs="lineup_column_defs"
                :data="starting_players"
                :show_row_numbers="false"
            ></app-grid>

            <h3>Bench</h3>
            <app-grid
                :column_defs="lineup_column_defs"
                :data="bench_players"
                :show_row_numbers="false"
            ></app-grid>
        </div>
    </div>
</div>
`

/**
 * Component representing the my-team page.
 * @extends Component
 */
class MyTeamComponent extends Component {
    static get selector() { return 'page-my-team' }
    static get template() { return template }
    static get props() { return [] }

    /**
     * The team name.
     * @type {string}
     */
    team_name = ''

    /**
     * The text next to the save button.
     * @type {string}
     */
    save_text = 'All changes saved.'

    /**
     * If true, the body of the page will be shown. Otherwise, hidden.
     * This is used to refresh the entire component at once.
     * @type {boolean}
     */
    show_body = true

    /**
     * The player currently being moved. If none, then will be set to undefined.
     * @type {undefined}
     */
    moving_player = undefined

    /**
     * Array of players filling starting line up positions. If no player is in
     * a position, then only the "postition" key will be set.
     * @type {object[]}
     */
    starting_players = []

    /**
     * Players on the bench.
     * @type {object[]}
     */
    bench_players = []

    /**
     * Column definitions for the starting/bench lineup grids.
     * @type {object[]}
     */
    lineup_column_defs = [
        {
            header: 'POS',
            key: 'position',
        },
        {
            header: 'Player',
            key: 'name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => {
                if ( !data.name ) {
                    return `<i style="color: darkgrey">none</i>`
                } else {
                    return `
                        <div class="center">
                            <img src="${data.image}" alt="${data.name}" height="50" style="border-radius: 50%">
                            <span>${data.name} (${data.number})</span>
                        </div>
                    `
                }
            },
        },
        {
            header: '',
            key: 'name',
            type: GridCellRenderType.Component,
            component: Vue.component('app-action-button'),
            button_color: (row, col) => this.moving_player ? '#CC5746' : '#0582CA',
            button_text: (row, col) => {
                return this.moving_player ? 'Here' : 'Move'
            },
            button_hidden: (row, col) => {
                if ( this.moving_player && this.moving_player.name !== row.name ) return false;
                if ( !row.name ) return true;
                return this.moving_player && this.moving_player.name === row.name;
            },
            on_click: (row, col) => {
                if ( !this.moving_player ) {
                    this.moving_player = row;
                } else {
                    const old_row = {...row};
                    const moved_row = {...this.moving_player};

                    for ( const prop in moved_row ) {
                        if ( prop === 'position' ) continue;
                        row[prop] = moved_row[prop]
                    }

                    for ( const prop in moved_row ) {
                        if ( prop === 'position' ) continue;
                        this.moving_player[prop] = old_row[prop]
                    }

                    this.moving_player = undefined;
                    this.$_vue_inst.mark_dirty();
                }

                this.$_vue_inst.update();  // $_vue_inst refers to the Vue.component instance, not the data class.
            },
        },
    ]

    /**
     * Column definitions for the overall team grid.
     * @type {object[]}
     */
    overall_column_defs = [
        {
            header: 'Name',
            key: 'name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.name}" height="50" style="border-radius: 50%">
                    <span>${data.name} (#${data.number})</span>
                </div>
            `,
        },
        {
            header: 'POS',
            key: 'position',
        },
        {
            header: 'ECR',
            title: 'Expected Coverage Rating',
            key: 'ecr',
        },
    ]

    /**
     * Data for the overall team grid (list of user's team players).
     * @type {object[]}
     */
    overall_data = []

    /**
     * Called when the component is instantiated. Initializes the bench players data.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        console.log('api', api)
        const [my_team, lineup] = await Promise.all([api.get_my_team(), api.get_my_team_current_lineup()])
        this.team_name = my_team.team_name
        this.overall_data = await api.get_my_team_players()
        this.bench_players = lineup.benched_players
        this.starting_players = lineup.starting_players

        setTimeout(() => {
            this.update();
        }, 500);
    }

    /**
     * Force re-render the entire component by briefly hiding it.
     */
    update() {
        this.show_body = false;

        this.$nextTick(() => {
            this.show_body = true;
        });
    }

    mark_dirty() {
        this.save_text = 'Unsaved changed'
    }

    async save_changes() {
        this.save_text = 'Saving changes...'

        setTimeout(() => {
            this.save_text = 'All changes saved.'
        }, 2000)
    }
}

export default MyTeamComponent
