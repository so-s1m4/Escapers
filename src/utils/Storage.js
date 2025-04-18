import React from 'react'
import fetchData from './fetchData.ts'
import { Admin, Game, Location, Rooms } from './apiController.ts'

class Store {
	constructor() {
		this.state = {
			myInfo: {},
			myLocations: [],
			curLocation: parseInt(localStorage.getItem('curLocation')) || '',
		}

		this.listeners = new Set()
	}
	async componentDidUpdate(newState) {
		const [games, rooms] = await Promise.all([
			Game.getLocationsGames(newState.curLocation),
			Rooms.getRooms(newState.curLocation),
		])
		this.setState({
			games: games.data,
			rooms: rooms.data,
		})
	}
	async loadInfo() {
		const myInfo = await Admin.getMyInfo()
		let myLocations;
		if (myInfo.success && myInfo.data.isSuperAdmin) {
			myLocations = await Location.getLocations()
		} else {
			myLocations = await Location.getMyLocations()
		}

		if (myInfo.success) {
			this.state.myInfo = myInfo.data
			this.state.myLocations = myLocations.data
			this.state.curLocation =
				parseInt(localStorage.getItem('curLocation')) || myLocations.data[0]?.id || ''
		} else {
			localStorage.clear()
			window.location.reload()
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
