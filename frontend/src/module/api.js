class API {
    _fetch = (...all) => fetch(...all)

    constructor() {
        this.base_url = typeof window !== 'undefined' ? APP_BASE_PATH.replace('/app/', '/api/v1/') : '/api/v1/'
    }

    async get_status() {
        return this.get_request('status')
    }

    async get_standings() {
        return this.get_request('league-standings')
    }

    async get_matchups() {
        return this.get_request('matchups')
    }

    async get_available_draft_players() {
        return this.get_request('draft-board/available')
    }

    async draft_player(player_id) {
        return this.post_request('draft-board/draft-player', { player_id })
    }

    async save_my_team(team_data) {
        return this.post_request('my-team', team_data)
    }

    async get_my_team() {
        return this.get_request('my-team')
    }

    async get_my_team_players() {
        return this.get_request('my-team/players')
    }

    async get_my_team_current_lineup() {
        return this.get_request('my-team/lineup')
    }

    async save_my_team_lineup(lineup_data) {
        return this.post_request('my-team/lineup', lineup_data)
    }

    async post_request(parts, data = {}) {
        if ( !Array.isArray(parts) ) parts = [parts]

        const url = this.build_url(...parts)
        const result = await this._fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return (await result.json()).data
    }

    async get_request(...parts) {
        const url = this.build_url(...parts)
        const result = await this._fetch(url)
        return (await result.json()).data
    }

    build_url(...parts) {
        let url = parts.join('/')
        if ( url.startsWith('/') ) url = url.slice(1)
        return `${this.base_url}${url}`
    }
}

const api = new API()
export { api }
