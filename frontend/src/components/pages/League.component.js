import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'
import {api} from '../../module/api.js'

const template = `
<div class="page-league">
  <div class="header">
    <div class="left">
      <h2>League Standings</h2>
    </div>
  </div>
    <app-grid
        :column_defs="column_defs"
        :data="data"
        :show_row_numbers="false"
    ></app-grid>
</div>
`

/**
 * Component representing the league standings page.
 * @extends Component
 */
class LeagueComponent extends Component {
    static get selector() { return 'page-league' }
    static get template() { return template }
    static get props() { return [] }

    GridCellRenderType = GridCellRenderType

    /**
     * Column definitions for the league standings grid.
     * @type {object[]}
     */
    column_defs = [
        {
            header: 'Standing',
            type: GridCellRenderType.HTML,
            key: 'standing',
            renderer: (value, row) => {
                return `
                    <h1 id="ranking">
                    Rank: ${row.standing.rank}
                    </h1>
                    <h2 id="record">
                        W/L: ${row.standing.win_loss}
                    </h2>
                `

            }
        },
        {
            header: 'Team',
            type: GridCellRenderType.HTML,
            key: 'team_name',
            renderer: (value, row) => {
                return `
                    <div class="center">
<!--                        <img src="${row.team_image}" alt="${row.team_image}" width="100">-->
                        <span>${row.team_name}</span>
                    </div>
                `
            },
        },
        {
            header: 'Stats',
            key: 'stats',
            type: GridCellRenderType.HTML,
            renderer: (value, row) => {
                const stats = []
                for ( const stat of value ) {
                    stats.push(`
                        <div class="stat">
                            <div class="title">${stat.name}</div>
                            <div>${stat.value}</div>
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
    ]

    /**
     * Sample data for the league standings grid.
     * @type {object[]}
     */
    data = []

    /**
     * Called when the component is instantiated.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.data = await api.get_standings()
    }
}

export default LeagueComponent
