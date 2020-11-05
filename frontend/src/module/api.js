class API {
    constructor() {
        this.base_url = APP_BASE_PATH.replace('/app/', '/api/v1/')
    }

    async get_my_team() {
        return this.get_request('my-team')
    }

    async get_my_team_players() {
        return this.get_request('my-team/players')
    }

    async get_request(...parts) {
        const url = this.build_url(...parts)
        const result = await fetch(url)
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
