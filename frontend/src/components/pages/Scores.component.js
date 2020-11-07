import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'
import {api} from '../../module/api.js'

const template = `
<div class="page-scores">
    <div class="header">
        <div class="left">
            <h2>Matchups & Scores - <small>Week {{ current_week }}</small></h2>
        </div>
        <div class="right" v-if="week_x_data.length > 1">
            <button :class="{ 'disable-click': current_week === max_week }" @click="to_next_week()">Next Week</button><button :class="{ 'disable-click': current_week === min_week }" @click="to_previous_week()">Previous Week</button>
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
 * Component representing the scores & match-ups page.
 * @extends Component
 */
class ScoresComponent extends Component {
    static get selector() { return 'page-scores' }
    static get template() { return template }
    static get props() { return [] }

    /**
     * The number of the current week shown in the interface
     * @type {number}
     */
    current_week = 1

    /**
     * Most recent week number.
     * @type {number}
     */
    max_week = 1

    /**
     * Least recent week number.
     * @type {number}
     */
    min_week = 1

    /**
     * Array of arrays of data for each week with first item being week 1, second being week 2, &c.
     * @type {object[][]}
     */
    week_x_data = []

    /**
     * Column definitions for the matchups grid.
     * @type {object[]}
     */
    column_defs = [
        {
            header: 'Date',
            type: GridCellRenderType.HTML,
            key: 'date',
            renderer: (_, data) => {
                return `${data.date} @ ${data.team_1}`
            }
        },
        {
            header: 'Team 1',
            type: GridCellRenderType.HTML,
            key: 'team_1',
            renderer: (_, data) => `
                <div style="display: flex; flex-direction: row;">
<!--                    <img src="${data.team_1_logo}" alt="${data.team_1}">-->
                    <div style="margin-left: 20px">
                        <b>${data.team_1}</b>
                        <p>Projection: ${data.team_1_projection}</p>
                    </div>
                </div>
            `
        },
        {
            header: 'Team 2',
            type: GridCellRenderType.HTML,
            key: 'team_2',
            renderer: (_, data) => `
                <div style="display: flex; flex-direction: row;">
<!--                    <img src="${data.team_2_logo}" alt="${data.team_2}">-->
                    <div style="margin-left: 20px">
                        <b>${data.team_2}</b>
                        <p>Projection: ${data.team_2_projection}</p>
                    </div>
                </div>
            `
        },
        {
            header: 'Outcome',
            type: GridCellRenderType.HTML,
            key: 'winner',
            renderer: (_, data) => {
                if ( data?.winner ) {
                    return `
                        <div><b>Winner:</b> ${data.winner}</div>
                        <div><b>Score: </b> ${data.winner_score} / ${data.loser_score}</div>
                    `
                } else {
                    return `N/A`
                }
            },
        }
    ]

    /**
     * The currently shown week's data.
     * @type {object[]}
     */
    data = []

    /**
     * Called when the component is instantiated. Initializes the current week to the most recent week.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.week_x_data = await api.get_matchups()
        this.max_week = this.current_week = this.week_x_data.length

        this.data = this.week_x_data[this.max_week - 1];
    }

    /**
     * When called, advances the data to the next-most recent week, if one exists.
     */
    to_next_week() {
        if ( this.current_week < this.max_week ) {
            this.current_week += 1;
            this.data = this.week_x_data[this.current_week - 1];
        }
    }

    /**
     * When called, advances the data to the next-least recent week, if one exists.
     */
    to_previous_week() {
        if ( this.current_week > this.min_week ) {
            this.current_week -= 1;
            this.data = this.week_x_data[this.current_week - 1];
        }
    }
}

export default ScoresComponent
