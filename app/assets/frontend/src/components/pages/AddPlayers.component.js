import { Component } from '../../../lib/vues6.js'
import { fake_players } from '../../module/fake_data.js'
import { clone } from '../../module/util.js'

const template = `
<div class="page-add-players">
    <div class="header">
        <div class="left">
            <h2>Add Players to Team</h2>
        </div>
        <div class="right">
            <button :class="{ 'disable-click': my_team_only }" @click="to_my_team_only()">My Team</button><button :class="{ 'disable-click': !my_team_only }" @click="to_all_players()">All Players</button>
        </div>
        <div class="right">
            <input type="text" placeholder="Quick filter..." v-model="quick_filter" @keyup="on_filter_change()">
        </div>
    </div>
    <div class="item-grid">
        <div class="item" v-for="player of filtered_players" @mouseover="on_photo_hover(player)"
            @mouseleave="on_photo_leave(player)">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="item-icon" v-if="!player.showing_stats">
                    <img :src="player.image" :alt="player.name">
                </div>
                <div class="item-contents" v-if="!player.showing_stats">
                    <h1>{{ player.name }}</h1>
                    <p>#{{ player.number }} ({{ player.position }})</p>
                </div>
                <div class="item-contents" style="flex: 1;" v-else>
                    <div>
                        <p v-if="player.team_name"><b>Team: </b> {{ player.team_name }}</p>
                        <p><b>Position: </b> {{ player.position }}</p>
                        <p v-for="(value, stat) in player.stats"><b>{{ stat }}: </b> {{ value }}</p>
                    </div>
                </div>
            </div>
            <div class="item-button">
                <button
                    v-if="my_team.length < 15 && !my_team.includes(player)"
                    @click="add_to_team(player)"
                    class="add"
                >Add to Team</button>
                <button
                    v-if="my_team.includes(player)"
                    @click="remove_from_team(player)"
                    class="remove"
                >Remove from Team</button>
            </div>
        </div>
    </div>
</div>
`

/**
 * A component which represents the "Add Players" page. Allows users to add/remove
 * players from their team.
 * @extends Component
 */
class AddPlayersComponent extends Component {
    static get selector() { return 'page-add-players' }
    static get props() { return [] }
    static get template() { return template }

    /**
     * The current value of the quick filter for players. If empty string, no filter is applied.
     * @type {string}
     */
    quick_filter = ''

    /**
     * If true, then only the players on the user's team will be shown.
     * @type {boolean}
     */
    my_team_only = false

    /**
     * Array of players currently on the user's team.
     * @type {object[]}
     */
    my_team = []

    /**
     * Array of currently displayed players, after the filter has been applied.
     * @type {object[]}
     */
    filtered_players = []

    /**
     * Array of currently displayed players, before the filter has been applied.
     * @type {object[]}
     */
    possible_players = []

    /**
     * All available players, whether they are on the user's team or not.
     * @type {object[]}
     */
    all_players = clone(fake_players)

    /**
     * Called when the page is instantiated.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.possible_players = [...this.all_players];
        this.filtered_players = [...this.possible_players];
    }

    /**
     * Called when the quick-filter changes. Applies the filter to the displayed players.
     */
    on_filter_change() {
        const query = this.quick_filter.toLowerCase()
        this.filtered_players = this.possible_players.filter(x => {
            if (!query) return true;
            return x.name.toLowerCase().includes(query) || x.position.toLowerCase().includes(query)
        })
    }

    /**
     * When called, change the display to show only the user's team.
     */
    to_my_team_only() {
        this.my_team_only = true;
        this.possible_players = [...this.my_team]
        this.on_filter_change()
    }

    /**
     * When called, change the display to show all available players.
     */
    to_all_players() {  
        this.my_team_only = false;
        this.possible_players = [...this.all_players]
        this.on_filter_change()
    }

    /**
     * Add the given player to the user's team, if not already there.
     * @param {object} player
     */
    add_to_team(player) {
        if (!this.my_team.includes(player)) {
            this.my_team.push(player)
        }
    }

    /**
     * Remove the given player from the user's team, if there.
     * @param {object} player
     */
    remove_from_team(player) {
        this.my_team = this.my_team.filter(x => x !== player)
        player.showing_stats = false
        if (this.my_team_only) this.to_my_team_only()
    }

    /**
     * Called when the user hovers over a player. Toggles the stats to be shown.
     * @param {object} player
     */
    on_photo_hover(player) {
        player.showing_stats = true
    }

    /**
     * Called when the user un-hovers over a player. Toggles the stats to hide.
     * @param {object} player
     */
    on_photo_leave(player) {
        player.showing_stats = false
    }
}

export default AddPlayersComponent
