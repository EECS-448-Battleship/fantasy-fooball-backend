import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-my-team">
    <div class="header">
        <div class="left team-name">
            <h2>My Team - </h2><input placeholder="Click to edit team name..." type="text" v-model="team_name">
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
    starting_players = [
        {
            position: 'QB',
        },
        {
            position: 'RB',
        },
        {
            position: 'RB',
        },
        {
            position: 'WR',
        },
        {
            position: 'WR',
        },
        {
            position: 'TE',
        },
        {
            position: 'FLX',
        },
        {
            position: 'DST',
        },
    ]

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
            key: 'player_name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => {
                if ( !data.player_name ) {
                    return `<i style="color: darkgrey">none</i>`
                } else {
                    return `
                        <div class="center">
                            <img src="${data.image}" alt="${data.player_name}" height="50" style="border-radius: 50%">
                            <span>${data.player_name}</span>
                        </div>
                    `
                }
            },
        },
        {
            header: '',
            key: 'player_name',
            type: GridCellRenderType.Component,
            component: Vue.component('app-action-button'),
            button_color: (row, col) => this.moving_player ? '#CC5746' : '#0582CA',
            button_text: (row, col) => {
                return this.moving_player ? 'Here' : 'Move'
            },
            button_hidden: (row, col) => {
                if ( this.moving_player && this.moving_player.player_name !== row.player_name ) return false;
                if ( !row.player_name ) return true;
                return this.moving_player && this.moving_player.player_name === row.player_name;
            },
            on_click: (row, col) => {
                if ( !this.moving_player ) {
                    this.moving_player = row;
                } else {
                    const old_row = {...row};
                    row.player_name = this.moving_player.player_name;
                    row.ecr = this.moving_player.ecr;
                    row.image = this.moving_player.image;

                    this.moving_player.player_name = old_row.player_name;
                    this.moving_player.ecr = old_row.ecr;
                    this.moving_player.image = old_row.image;
                    this.moving_player = undefined;
                    console.log(this.moving_player, row);
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
            key: 'player_name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.player_name}" height="50" style="border-radius: 50%">
                    <span>${data.player_name}</span>
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
    overall_data = [
        {
            player_name: 'Christian McCaffrey',
            position: 'RB1',
            ecr: '0.0',
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
        },
        {
            player_name: 'Ezekiel Elliott',
            position: 'RB3',
            ecr: '1.0',
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
        },
        {
            player_name: 'Dalvin Cook',
            position: 'RB5',
            ecr: '0.0',
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
        },
        {
            player_name: 'Alvin Kamara',
            position: 'RB6',
            ecr: '-1.0',
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
        },
        {
            player_name: 'Michael Thomas',
            position: 'WR1',
            ecr: '3.0',
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
        },
        {
            player_name: 'Davante Adams',
            position: 'WR2',
            ecr: '4.0',
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
        },
        {
            player_name: 'Travis Kelce',
            position: 'TE1',
            ecr: '-4.0',
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
        },
    ]

    /**
     * Called when the component is instantiated. Initializes the bench players data.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.bench_players = this.overall_data.map(x => { x = {...x, position: 'B'}; return x })

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
}

export default MyTeamComponent
