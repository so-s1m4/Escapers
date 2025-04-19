import fetchData from './fetchData.ts'

type adminCreateData = {
	firstName: string
	lastName: string
	username: string
	password: string
}
type locationCreateData = {
	address: string
	city: string
	postcode: string
	phone: string
	mail: string
}

export class Admin {
	static async getMyInfo() {
		return await fetchData.get('/admin').then(res => res)
	}
	static async getAdmins() {
		return await fetchData.get('/admin/list').then(res => res)
	}
	static async getAdmin(id: number) {
		return await fetchData.get(`/admin/${id}`).then(res => res)
	}
	static async login(data: { username: string; password: string }) {
		return await fetchData.post('/admin/login', data).then(res => res)
	}
	static async addAdmin(data: adminCreateData) {
		return await fetchData.post('/admin/register', data).then(res => res)
	}
	static async updateAdmin(adminId: number, data: adminCreateData) {
		return await fetchData.patch(`/admin/${adminId}`, data).then(res => res)
	}
	static async deleteAdmin(adminId: number) {
		return await fetchData.delete(`/admin/${adminId}`).then(res => res)
	}
}
export class Location {
	static async getMyLocations() {
		return await fetchData.get('/admin/location').then(res => res)
	}
	static async getLocations() {
		return await fetchData.get('/location/list').then(res => res)
	}
	static async getLocation(id: number) {
		return await fetchData.get(`/location/${id}`).then(res => res)
	}
	static async getAdminLocations(adminId: number) {
		return await fetchData.get(`/admin/${adminId}/location`).then(res => res)
	}
	static async addLocation(data: locationCreateData) {
		return await fetchData.post('/location', data).then(res => res)
	}
	static async addAdminToLocation(adminId: number, locationId: number) {
		return await fetchData
			.post(`/admin/${adminId}/location/${locationId}`)
			.then(res => res)
	}

	static async updateLocation(locationId: number, data: locationCreateData) {
		return await fetchData
			.patch(`/location/${locationId}`, data)
			.then(res => res)
	}
	static async deleteAdminFromLocation(adminId: number, locationId: number) {
		return await fetchData
			.delete(`/admin/${adminId}/location/${locationId}`)
			.then(res => res)
	}
	static async deleteLocation(locationId: number) {
		return await fetchData.delete(`/location/${locationId}`).then(res => res)
	}
	static async deleteGameFromLocation(locationId: number, gameId: number) {
		return await fetchData
			.delete(`/location/${locationId}/game/${gameId}`)
			.then(res => res)
	}
}
export class Game {
	static async getLocationsGames(locationId: number) {
		return await fetchData.get(`/location/${locationId}/game`).then(res => res)
	}
	static async getLocationGameById(locationId: number, gameId: number) {
		return await fetchData
			.get(`/location/${locationId}/game/${gameId}`)
			.then(res => res)
	}
	static async addGameToLocation(locationId: number, data: FormData) {
		return await fetchData
			.post(`/location/${locationId}/game`, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => res)
	}
	static async deleteGameFromLocation(locationId: number, gameId: number) {
		return await fetchData
			.delete(`/location/${locationId}/game/${gameId}`)
			.then(res => res)
	}
	static async updateLocationGame(
		locationId: number,
		gameId: number,
		data: FormData & {
			name: string
			icon: File
			color: string
			maxPlayers: number
		}
	) {
		return await fetchData
			.patch(`/location/${locationId}/game/${gameId}`, data)
			.then(res => res)
	}
}
export class Room {
	static async getRooms(locationId: number) {
		return await fetchData
			.get(`/room`, {
				params: {
					locationId,
				},
			})
			.then(res => res)
	}
	static async createRoom(locationId: number, gameId: number) {
		return await fetchData
			.post(`/room`, { LocationId: locationId, GameId: gameId })
			.then(res => res)
	}
	static async closeRoom(id: number) {
		return await fetchData.patch(`/room/${id}/close`).then(res => res)
	}
}

// EXAMPLE FUNCTION
//static async getMyInfo() {}
