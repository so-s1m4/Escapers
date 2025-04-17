import fetchData from "./fetchData.ts"
import { Admin, Game, Location } from "./apiController.ts"

class Store {
	constructor() {
		this.state = {
			myInfo:{},
			myLocations:[],
		}

		this.listeners = new Set()
	}


	async loadInfo() {
		const [myInfo, myLocations] = await Promise.all([Admin.getMyInfo(), Location.getMyLocations()])

		if (myInfo.success) {
			this.state.myInfo = myInfo.data
			this.state.myLocations = myLocations.data
		} else {
			localStorage.clear()
			window.location.reload()
		}

		console.log(this.state)
		this.listeners.forEach(component => component.loadInfo())
	}

	register(component) {
		this.listeners.add(component)
	}

	unregister(component) {
		this.listeners.delete(component)
	}

	setState(newState) {
		this.state = { ...this.state, ...newState }
		this.listeners.forEach(component => component.loadInfo())
	}


	getState() {
		return this.state
	}
}

export const store = new Store()
