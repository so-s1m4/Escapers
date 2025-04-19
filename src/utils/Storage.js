import { Admin, Game, Location, Room } from './apiController.ts'

class Store {
	constructor() {
		this.state = {
			myInfo: null,
			myLocations: [],
			curLocation: parseInt(localStorage.getItem('curLocation')) || '',
		}

		this.listeners = new Set()
	}
	async componentDidUpdate(newState) {
		if (newState.curLocation == '' || newState.curLocation == undefined) {
			return null
		}
		let [games, rooms] = await Promise.all([
			Game.getLocationsGames(newState.curLocation),
			Room.getRooms(newState.curLocation),
		])
		rooms = rooms.data
		rooms.reverse()
		this.setState({
			games: games.data,
			rooms,
		})
	}

	async getGames() {
		if (this.state.games) return this.state.games
		const games = await Game.getLocationsGames(this.state.curLocation)
		this.setState({ games: games.data })
		return games.data
	}

	async getRooms() {
		if (this.state.rooms) return this.state.rooms
		const rooms = await Room.getRooms(this.state.curLocation)
		rooms = rooms.data
		rooms.reverse()
		this.setState({ rooms })
		return rooms.data
	}

	async getMyInfo() {
		if (this.state.myInfo) return this.state.myInfo
		const myInfo = await Admin.getMyInfo()
		if (myInfo.success) {
			this.setState({ myInfo: myInfo.data })
			return myInfo.data
		} else {
			localStorage.clear()
			window.location.reload()
			this.listeners.forEach(component => component.forceUpdate())
		}
		return null
	}

	async loadInfo() {
		const myInfo = await this.getMyInfo()

		let myLocations;
		if (myInfo && myInfo.isSuperAdmin) {
			myLocations = await Location.getLocations()
		} else {
			myLocations = await Location.getMyLocations()
		}

		if (myInfo) {
			this.state.myInfo = myInfo
			this.state.myLocations = myLocations.data
			this.state.curLocation =
				parseInt(localStorage.getItem('curLocation')) || myLocations.data[0]?.id || ''
		}
		this.componentDidUpdate(this.state)
		this.listeners.forEach(component => component.loadInfo())
	}
	register(component) {
		this.listeners.add(component)
	}

	unregister(component) {
		this.listeners.delete(component)
	}

	async setState(newState) {
		if (newState.curLocation == '' || newState.curLocation == undefined) {
			newState.curLocation = this.state.curLocation
		}

		if (newState.curLocation != this.state.curLocation) {
			this.state.curLocation = await parseInt(newState.curLocation)
			localStorage.setItem('curLocation', newState.curLocation)
			await this.componentDidUpdate(newState)
		}
		this.state = { ...this.state, ...newState }
		this.listeners.forEach(component => component.loadInfo())
	}
	getState() {
		return this.state
	}
}

export const store = new Store()
