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
		return await fetchData.get('/admins/me').then(res => res)
	}
	static async getAdmins() {
		return await fetchData.get('/admins').then(res => res)
	}
	static async getAdmin(id: number) {
		return await fetchData.get(`/admins/${id}`).then(res => res)
	}
	static async login(data: { username: string; password: string }) {
		return await fetchData.post('/admins/login', data).then(res => res)
	}
	static async addAdmin(data: adminCreateData) {
		return await fetchData.post('/admins/register', data).then(res => res)
	}
	static async updateAdmin(adminId: number, data: adminCreateData) {
		return await fetchData.patch(`/admins/${adminId}`, data).then(res => res)
	}
	static async deleteAdmin(adminId: number) {
		return await fetchData.delete(`/admins/${adminId}`).then(res => res)
	}
}
export class Location {
	static async getMyLocations() {
		return await fetchData.get('/admins/me/locations').then(res => res)
	}
	static async getLocations() {
		return await fetchData.get('/locations').then(res => res)
	}
	static async getLocation(id: number) {
		return await fetchData.get(`/locations/${id}`).then(res => res)
	}
	static async getAdminLocations(adminId: number) {
		return await fetchData.get(`/admins/${adminId}/locations`).then(res => res)
	}
	static async addLocation(data: locationCreateData) {
		return await fetchData.post('/locations', data).then(res => res)
	}
	static async addAdminToLocation(adminId: number, locationId: number) {
		return await fetchData
			.post(`/admins/${adminId}/locations/${locationId}`)
			.then(res => res)
	}

	static async updateLocation(locationId: number, data: locationCreateData) {
		return await fetchData
			.patch(`/locations/${locationId}`, data)
			.then(res => res)
	}
	static async deleteAdminFromLocation(adminId: number, locationId: number) {
		return await fetchData
			.delete(`/admins/${adminId}/locations/${locationId}`)
			.then(res => res)
	}
	static async deleteLocation(locationId: number) {
		return await fetchData.delete(`/locations/${locationId}`).then(res => res)
	}
	static async deleteGameFromLocation(locationId: number, gameId: number) {
		return await fetchData
			.delete(`/locations/${locationId}/games/${gameId}`)
			.then(res => res)
	}
}
export class Game {
	static async getLocationsGames(locationId: number) {
		return await fetchData
			.get(`/locations/${locationId}/games`)
			.then(res => res)
	}
	static async getLocationGameById(locationId: number, gameId: number) {
		return await fetchData
			.get(`/locations/${locationId}/games/${gameId}`)
			.then(res => res)
	}
	static async addGameToLocation(locationId: number, data: FormData) {
		return await fetchData
			.post(`/locations/${locationId}/games`, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => res)
	}
	static async deleteGameFromLocation(locationId: number, gameId: number) {
		return await fetchData
			.delete(`/locations/${locationId}/games/${gameId}`)
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
			.patch(`/locations/${locationId}/games/${gameId}`, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => res)
	}
}
export class Room {
	static async getRoomsOnLocation(locationId: number) {
		return await fetchData
			.get(`/locations/${locationId}/rooms`)
			.then(res => res)
	}
	static async createRoom(locationId: number, gameId: number) {
		return await fetchData
			.post(`/rooms`, { LocationId: locationId, GameId: gameId })
			.then(res => res)
	}
	static async closeRoom(id: number) {
		return await fetchData.patch(`/rooms/${id}/close`).then(res => res)
	}
	static async isRoomOpen(code: number) {
		return await fetchData.get(`/rooms/code/${code}/`).then(res => res)
	}
	static async addClientToRoom(
		roomId: number,
		clientId: number,
		file: File,
		password: string | null
	) {
		const data = {
			file,
		}
		return await fetchData
			.post(`/rooms/${roomId}/clients/${clientId}`, data, {
				params: { password },
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => res)
	}
	static async deleteClientFromRoom(roomId: number, clientId: number) {
		return await fetchData
			.delete(`/rooms/${roomId}/clients/${clientId}`)
			.then(res => res)
	}
	static async getClientsInRoom(roomId: number) {
		return await fetchData.get(`/rooms/${roomId}/clients`).then(res => res)
	}
	static async updateGameTime(roomId: number, gameTime: number) {
		return await fetchData
			.patch(`/rooms/${roomId}`, { gameTime })
			.then(res => res)
	}
}
export class Client {
	static async getClients() {
		const cl = await fetchData.get('/clients').then(res => res)
		return cl
	}
	static async getClient(id: number, password: string | null) {
		return await fetchData
			.get(`/clients/${id}`, { params: { password } })
			.then(res => res)
	}
	static async register(
		file,
		data: {
			firstName: string
			lastName: string
			birthday: string
			phone: string | null
			mail: string | null
		},
		code: string | null
	) {
		return await fetchData
			.post(
				'/clients/',
				{ file, data: JSON.stringify(data) },
				{
					params: { code },
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			.then(res => res)
	}
	static async update(
		id: number,
		data: {
			file: File | null
			data: any
		}
	) {
		return await fetchData
			.patch(`/clients/${id}`, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(res => res)
	}

	static async delete(id: number) {
		return await fetchData.delete(`/clients/${id}`).then(res => res)
	}
	static async getRoomsOfClient(id: number, password: string) {
		return await fetchData.get(`/clients/${id}/rooms`, { params: { password } })
	}
}

// EXAMPLE FUNCTION
//static async getMyInfo() {}
