// src/lib/axios.js
import axios from 'axios'

const IP = '192.168.31.135'
const PORT = '8000'
export const BASE_URL = `http://${IP}:${PORT}`

const api = axios.create({
	baseURL: `${BASE_URL}/api`,
	timeout: 10_000,
	headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
	cfg => {
		const token = localStorage.getItem('token')
		if (token) cfg.headers.Authorization = `Bearer ${token}`

		return cfg
	},
	err => Promise.reject(err)
)

api.interceptors.response.use(
	res => res.data,
	err => {
		console.error('[API‑error]', err)
		return Promise.reject(err)
	}
)

export default api
