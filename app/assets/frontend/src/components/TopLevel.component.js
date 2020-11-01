import {Component} from '../../lib/vues6.js'
import {router} from '../module/routing.js'

const template = `
<div class="top-level-container">
    <div class="navbar-container">
        <h1 class="title">Fantasy Football</h1>
        <ul class="navbar">
            <li class="navbar-item" v-for="item of navbar_items" :class="{ active: current_route === item.page }">
                <app-link :href="item.page" :text="item.title"></app-link>
            </li>
            
            <li class="navbar-item">
                <a href="#" @click="on_refresh($event)">Refresh</a>
            </li>
        </ul>
    </div>
    <div class="page-container">
        <page-my-team v-if="current_route === 'my-team'"></page-my-team>
        <page-add-players v-if="current_route === 'my-team/add-players'"></page-add-players>
        <page-scores v-if="current_route === 'scores'"></page-scores>
        <page-league v-if="current_route === 'league'"></page-league>
        <page-draft-board v-if="current_route === 'draft-board'"></page-draft-board>
    </div>
</div>
`

/**
 * Top-level component which manages the display of the entire game.
 * @extends Component
 */
class TopLevelComponent extends Component {
    static get selector() { return 'app-top-level' }
    static get template() { return template }
    static get props() { return [] }

    /**
     * The currently loaded page route.
     * @type {string}
     */
    current_route = ''

    /**
     * Array of navigation bar items where "title" is the page name, and "page" is the page route.
     * @type {Array<object>}
     */
    navbar_items = [
        { title: 'My Team', page: 'my-team' },
        { title: 'Add Players', page: 'my-team/add-players' },
        { title: 'Scores', page: 'scores' },
        { title: 'League', page: 'league' },
        { title: 'Draft Board', page: 'draft-board' },
    ]

    /**
     * Called when the component is initialized.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        // Listen for navigation changes.
        this.router_subscription = router.subscribe((path, args) => this.on_route_change(path, args))

        const url_params = new URLSearchParams(window.location.search)
        if ( url_params.has('then') ) {
            const route = url_params.get('then')
            router.navigate(route)
        } else if ( !this.current_route ) {
            router.navigate('my-team')
        }
    }

    /**
     * Called when the component is destroyed.
     * @return {Promise<void>}
     */
    async vue_on_destroy() {
        // Stop listening for navigation changes.
        this.router_subscription.unsubscribe()
    }

    /**
     * Called when the navigation changes.
     * @param {string} path
     * @param {*} args
     * @return {Promise<void>}
     */
    async on_route_change(path, args) {
        if ( path.startsWith('/') ) path = path.slice(1)
        if ( path.endsWith('/') ) path = path.slice(0, -1)

        this.current_route = path
    }

    on_refresh($event) {
        window.location.href = `/?then=${this.current_route}`
    }
}

export default TopLevelComponent
