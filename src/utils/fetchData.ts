// src/lib/axios.js
import axios from 'axios'

const IP = 'escapers.m0sk1tu4.codes'
export const BASE_URL = `https://${IP}`

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
