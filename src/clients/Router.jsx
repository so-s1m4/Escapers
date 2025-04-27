import { Routes, Route } from 'react-router'
import Login from './components/Login.jsx'
import Main from './components/pages/Main.jsx'

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}
