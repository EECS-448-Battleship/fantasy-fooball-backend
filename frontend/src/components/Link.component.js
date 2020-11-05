import {Component} from '../../lib/vues6.js'
import {router} from '../module/routing.js'

const template = `
<a href="#" @click="on_click()">{{ text }}</a>
`

/**
 * Component providing hyper-links that navigate to other pages in the SPA,
 * without reloading the page.
 */
class LinkComponent extends Component {
    static get selector() { return 'app-link' }
    static get template() { return template }
    static get props() { return ['href', 'args', 'text'] }

    /**
     * Called when the link is clicked. Navigates the router.
     */
    on_click() {
        router.navigate(this.href, this.args)
    }
}

export default LinkComponent
