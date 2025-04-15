const API_URL = 'http://192.168.31.24:8000/api'

export default async function fetchData(
	endpoint: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
	payload: object = null
) {
	try {
		const response = await fetch(`${API_URL}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: payload ? JSON.stringify(payload) : null,
		})

		return await response.json()
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}
