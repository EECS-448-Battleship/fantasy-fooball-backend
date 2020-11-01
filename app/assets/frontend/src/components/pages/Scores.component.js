import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-scores">
    <div class="header">
        <div class="left">
            <h2>Matchups & Scores - <small>Week {{ current_week }}</small></h2>
        </div>
        <div class="right">
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
    current_week = 6

    /**
     * Most recent week number.
     * @type {number}
     */
    max_week = 6

    /**
     * Least recent week number.
     * @type {number}
     */
    min_week = 1

    /**
     * Array of arrays of data for each week with first item being week 1, second being week 2, &c.
     * @type {object[][]}
     */
    week_x_data = [
        // Week 1 Data
        [
          {
              "date": "11/2/2020",
              "team_1": "Team 1",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 50,
              "team_2": "Team 6",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 73
          },
          {
              "date": "10/23/2020",
              "team_1": "Team 2",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 66,
              "team_2": "Team 5",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 71,
              "winner": "Team 5",
              "winner_score": "84",
              "loser_score": "41",
          },
          {
              "date": "10/31/2020",
              "team_1": "Team 3",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 85,
              "team_2": "Team 4",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 67
          },
        ],
          // Week 2 Data
        [
          {
              "date": "11/2/2020",
              "team_1": "Team 1",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 58,
              "team_2": "Team 6",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 34
          },
          {
              "date": "10/23/2020",
              "team_1": "Team 2",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 57,
              "team_2": "Team 5",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 27,
              "winner": "Team 5",
              "winner_score": "84",
              "loser_score": "41",
          },
          {
              "date": "10/31/2020",
              "team_1": "Team 3",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 48,
              "team_2": "Team 4",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 49
          },
        ],
          // Week 3 Data
        [
          {
              "date": "11/2/2020",
              "team_1": "Team 1",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 67,
              "team_2": "Team 6",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 47
          },
          {
              "date": "10/23/2020",
              "team_1": "Team 2",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 83,
              "team_2": "Team 5",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 62,
              "winner": "Team 5",
              "winner_score": "84",
              "loser_score": "41",
          },
          {
              "date": "10/31/2020",
              "team_1": "Team 3",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 48,
              "team_2": "Team 4",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 17
          },
        ],
          // Week 4 Data
        [
          {
              "date": "11/2/2020",
              "team_1": "Team 1",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 30,
              "team_2": "Team 6",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 41
          },
          {
              "date": "10/23/2020",
              "team_1": "Team 2",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 65,
              "team_2": "Team 5",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 27,
              "winner": "Team 5",
              "winner_score": "84",
              "loser_score": "41",
          },
          {
              "date": "10/31/2020",
              "team_1": "Team 3",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 48,
              "team_2": "Team 4",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 24
          },
        ],
          // Week 5 Data
        [
          {
              "date": "11/2/2020",
              "team_1": "Team 1",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 43,
              "team_2": "Team 6",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 48
          },
          {
              "date": "10/23/2020",
              "team_1": "Team 2",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 57,
              "team_2": "Team 5",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 61,
              "winner": "Team 5",
              "winner_score": "84",
              "loser_score": "41",
          },
          {
              "date": "10/31/2020",
              "team_1": "Team 3",
              "team_1_logo": "https://via.placeholder.com/150x100",
              "team_1_projection": 48,
              "team_2": "Team 4",
              "team_2_logo": "https://via.placeholder.com/150x100",
              "team_2_projection": 91
          },
        ],
          // Week 6 Data
        [
            {
                "date": "11/2/2020",
                "team_1": "Team 1",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 50,
                "team_2": "Team 6",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 37
            },
            {
                "date": "10/23/2020",
                "team_1": "Team 2",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 36,
                "team_2": "Team 5",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 71,
                "winner": "Team 5",
                "winner_score": "84",
                "loser_score": "41",
            },
            {
                "date": "10/31/2020",
                "team_1": "Team 3",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 48,
                "team_2": "Team 4",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 1
            },
        ]
    ]

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
                    <img src="${data.team_1_logo}" alt="${data.team_1}">
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
                    <img src="${data.team_2_logo}" alt="${data.team_2}">
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
