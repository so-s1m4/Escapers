import { Routes, Route } from 'react-router'
import Login from './components/Login.jsx'
import Main from './components/pages/Main.jsx'
import { Navigate } from 'react-router-dom'

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}
