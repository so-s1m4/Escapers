import { Routes, Route } from 'react-router'
import Join from './components/Join'
import RegisterForm from './components/RegisterForm'
import { Navigate } from 'react-router-dom'
export default function Router() {
	return (
		<Routes>
			<Route path='/join' element={<Join />} />
			<Route path='/join/:id/*' element={<RegisterForm />} />
			<Route path='/join' element={<Navigate to='/rooms' />} />
		</Routes>
	)
}
