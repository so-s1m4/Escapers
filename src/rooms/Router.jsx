import { Routes, Route } from 'react-router'
import Join from './components/Join'
import RegisterForm from './components/RegisterForm'
export default function Router() {
	return (
		<Routes>
			<Route path='/join' element={<Join />} />
			<Route path='/join/:id/*' element={<RegisterForm />} />
			<Route path='*' element={<h2>Not Found</h2>} />
		</Routes>
	)
}
