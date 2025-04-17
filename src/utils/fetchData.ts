// src/lib/axios.js
import axios from 'axios'

// 1. Базовая конфигурация ────────────────────────────────
const api = axios.create({
	baseURL: 'http://localhost:8000/api',
	timeout: 10_000,
	headers: { 'Content-Type': 'application/json' },
	// withCredentials: true,
})

// 2. Запрос‑интерцептор ──────────────────────────────────
api.interceptors.request.use(
	cfg => {
		const token = localStorage.getItem('token')
		if (token) cfg.headers.Authorization = `Bearer ${token}`

		return cfg
	},
	err => Promise.reject(err)
)

// 3. Ответ‑интерцептор ───────────────────────────────────
api.interceptors.response.use(
	res => res.data,
	err => {
		console.error('[API‑error]', err)
		return Promise.reject(err)
	}
)

export default api
