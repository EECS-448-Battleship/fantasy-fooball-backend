import {Component} from '../../lib/vues6.js'

/**
 * An enum representing the different grid cell renderer types for the shared grid.
 * @type {object}
 */
const GridCellRenderType = {
    Simple: Symbol('simple'),
    HTML: Symbol('html'),
    Component: Symbol('component'),
}

export {GridCellRenderType}

const template = `
<div class="component-app-grid">
    <table>
        <tr>
            <th v-if="show_row_numbers">#</th>
            <th v-for="col of column_defs" :title="col.title || ''">{{ col.header || '' }}</th>
        </tr>
        <tr v-for="(row, idx) of data">
            <td v-if="show_row_numbers">{{ idx + 1 }}</td>
            <td v-for="col of column_defs">
                <div v-if="!col.type || col.type === GridCellRenderType.Simple">{{ row[col.key] }}</div>
                <div v-if="col.type === GridCellRenderType.HTML" v-html="col.renderer(row[col.key], row)"></div>
                <div v-if="col.type === GridCellRenderType.Component">
                    <component :is="col.component" :row="row" :col="col" :idx="idx" @click="on_col_click(col, $event)"></component>
                </div>
            </td>
        </tr>
    </table>
</div>
`

/**
 * Shared grid component used to show tables in various interfaces.
 * @extends Component
 */
class GridComponent extends Component {
    static get selector() { return 'app-grid' }
    static get template() { return template }
    static get props() {
        return [
            'show_row_numbers',
            'column_defs',
            'data',
        ]
    }

    GridCellRenderType = GridCellRenderType

    /**
     * Called when the component is instantiated.
     * @return {Promise<void>}
     */
    async vue_on_create() {

    }

    /**
     * Called when the component renderer emits a click event, to pass it along to the column definition.
     * @param {object} col - the column definition
     * @param {object} row - the row clicked
     * @param {object} passcol - the column emitted from the component
     */
    on_col_click(col, [row, passcol]) {
        col.on_click(row, passcol)
    }
}

export default GridComponent
