import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Login from './components/Login'
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Rooms from './components/Rooms'
import Clients from './components/Clients'
import SuperAdmin from './components/sa/SuperAdmin'
import { store } from 'utils/Storage'
import { Navigate } from 'react-router-dom'
export default function Router() {
	const nav = useNavigate()
	if (localStorage.getItem('token') == null) {
		return <Login />
	}
	store.loadInfo()
	return (
		<Layout>
			<Routes>
				<Route path='/rooms/*' element={<Rooms nav={nav} />} />
				<Route path='/clients/*' element={<Clients />} />
				<Route path='/bookings/*' element={<h2>Bookings</h2>} />
				<Route path='/sa/*' element={<SuperAdmin />} />
				<Route path='*' element={<Navigate to="/admin/rooms" />} />
			</Routes>
		</Layout>
	)
}
