import {Component} from '../../lib/vues6.js'

const template = `
<div class="component-action-button">
    <button
        v-if="!hidden"
        v-bind:style="{border: '2px solid lightgrey', borderRadius: '3px', backgroundColor: color, color: 'white'}"
        @click="on_click($event)"
    >{{ text }}</button>
</div>
`

/**
 * Component representing an action button that can be embedded in the shared grid.
 * @extends Component
 */
class GridActionButtonComponent extends Component {
    static get selector() { return 'app-action-button' }
    static get template() { return template }
    static get props() { return ['row', 'col'] }

    /**
     * The text shown on the action button.
     * @type {string}
     */
    text = ''

    /**
     * The CSS color of the action button.
     * @type {string}
     */
    color = 'white'

    /**
     * If true, the action button will be hidden.
     * @type {boolean}
     */
    hidden = false

    /**
     * Called when the component is instantiated. Updates the text, color, and hide status.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    /**
     * Called when the row value changes. Updates the text, color, and hide status.
     */
    watch_row() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    /**
     * Called when the column value changes. Updates the text, color, and hide status.
     */
    watch_col() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    /**
     * Determine the text to show on the button based on the column definition.
     */
    update_text() {
        if ( typeof this.col.button_text === 'function' ) {
            this.text = this.col.button_text(this.row, this.col)
        } else {
            this.text = this.col.button_text || ''
        }
    }

    /**
     * Determine the color to show on the button based on the column definition.
     */
    update_color() {
        if ( typeof this.col.button_color === 'function' ) {
            this.color = this.col.button_color(this.row, this.col)
        } else {
            this.color = this.col.button_color || 'white'
        }
    }

    /**
     * Determine whether the button should be shown or not, based on the column definition.
     */
    update_hidden() {
        if ( !('button_hidden' in this.col) ) {
            this.hidden = false;
        } else if ( typeof this.col.button_hidden === 'function' ) {
            this.hidden = this.col.button_hidden(this.row, this.col)
        } else {
            this.hidden = this.col.button_hidden
        }
    }

    /**
     * Called when the button is clicked. Emits a click event and updates the text, color, and hide status.
     * @param {MouseEvent} $event
     */
    on_click($event) {
        this.$emit('click', [this.row, this.col])
        this.update_text()
        this.update_color()
        this.update_hidden()
    }
}

export default GridActionButtonComponent
