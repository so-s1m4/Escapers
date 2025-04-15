import fetchData from "./fetchData.ts"

class Store {
	constructor() {
		this.state = {
			myInfo:{},
			rooms:[],
		}

		this.listeners = new Set()
	}


	async loadInfo() {
		const myInfo = await fetchData("/admin", "GET").then(res => {
			if (res.status) {
				return res.data
			} else {
				console.error(res)
				return null
			}
		}).catch(err => {
			console.error(err)
		})



		this.listeners.forEach(component => component.loadInfo())
	}

	register(component) {
		this.listeners.add(component)
	}

	unregister(component) {
		this.listeners.delete(component)
	}

	async setState(newState) {
		this.state = { ...this.state, ...newState }
		this.listeners.forEach(component => component.loadInfo())
	}


	getState() {
		return this.state
	}
}

export const store = new Store()
