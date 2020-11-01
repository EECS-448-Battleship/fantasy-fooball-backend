import {Component} from '../../../lib/vues6.js'
import {fake_players} from '../../module/fake_data.js'
import {GridCellRenderType} from '../Grid.component.js'
import {clone} from '../../module/util.js'

const template = `
<div class="page-draft-board">
    <div class="header">
        <div class="left">
            <h2>Draft Board</h2>
        </div>
    </div>
    <div class="body" style="display: flex; flex-direction: row">
        <div class="picks" style="margin-right: 20px;">
            <app-grid
                :column_defs="top_picks_column_defs"
                :data="top_picks"
                :show_row_numbers="true"
            ></app-grid>
        </div>
        <app-grid
            style="flex: 1"
            :column_defs="column_defs"
            :data="data"
            :show_row_numbers="false"
        ></app-grid>
    </div>
</div>
`

/**
 * Component representing the draft board page.
 * @extends Component
 */
class DraftBoardComponent extends Component {
    static get selector() { return 'page-draft-board' }
    static get template() { return template }
    static get props() { return [] }

    top_picks_column_defs = [
        {
            header: 'Player',
            key: 'name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.name}" height="50" style="border-radius: 50%">
                    <span>${data.name}</span>
                </div>
            `,
        }
    ]

    top_picks = []

    column_defs = [
        {
            header: 'Name',
            key: 'name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.name}" height="50" style="border-radius: 50%">
                    <span>${data.name}</span>
                </div>
            `,
        },
        {
            header: 'Team',
            key: 'team_name',
        },
        {
            header: 'Position',
            key: 'position',
        },
        {
            header: 'Points',
            key: 'points',
        },
        {
            header: 'Stats',
            key: 'stats',
            type: GridCellRenderType.HTML,
            renderer: (value, row) => {
                const stats = []
                for ( const stat in value ) {
                    if ( !value.hasOwnProperty(stat) ) continue; // Prototypical member

                    stats.push(`
                        <div class="stat">
                            <div class="title">${stat}</div>
                            <div>${value[stat]}</div>
                        </div>
                    `)
                }

                return `
                    <div class="stats">
                        ${stats.join('\n')}
                    </div>
                `
            },
        },
        {
            header: '',
            key: 'stats',
            type: GridCellRenderType.Component,
            component: Vue.component('app-action-button'),
            button_color: (row, col) => '#CC5746',
            button_text: (row, col) => 'Draft',
            button_hidden: (row, col) => this.top_picks.includes(row),
            on_click: (row, col) => {
                this.top_picks.push(row);
            },
        },
    ]

    data = clone(fake_players)

    async vue_on_create() {

    }
}

export default DraftBoardComponent
