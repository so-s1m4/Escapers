import fetchData from './fetchData.ts'

type adminCreateData = {
	username: string
	password: string
}
type adminLoginData = {
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

// GET FUNCTIONS
export async function getMyInfo() {
	return await fetchData('/admin', 'GET').then(res => res.json())
}
export async function getMyLocations() {
	return await fetchData('/admin/location', 'GET').then(res => res.json())
}
export async function getAdmins() {
	return await fetchData('/admin/list', 'GET').then(res => res.json())
}
export async function getAdmin(id: number) {
	return await fetchData(`/admin/${id}`, 'GET').then(res => res.json())
}
export async function getLocations() {
	return await fetchData('/location/list', 'GET').then(res => res.json())
}
export async function getLocation(id: number) {
	return await fetchData(`/location/${id}`, 'GET').then(res => res.json())
}
export async function getAdminLocations(adminId: number) {
	return await fetchData(`/admin/${adminId}/location`, 'GET').then(res =>
		res.json()
	)
}

// POST FUNCTIONS
export async function login(data: adminLoginData) {
	return {success: true, token: '1234567890' }
	// return await fetchData('/admin/login', 'POST', data).then(res => res.json())
}
export async function addAdmin(data: adminCreateData) {}
export async function addLocation(data: locationCreateData) {}
export async function addAdminToLocation(data: {
	adminId: number
	locationId: number
}) {}

// PUT FUNCTIONS
export async function updateAdmin() {}
export async function updateLocation() {}

// DELETE FUNCTIONS

export async function deleteAdmin() {}
export async function deleteAdminFromLocation() {}
export async function deleteLocation() {}

// EXAMPLE FUNCTION
//export async function getMyInfo() {}