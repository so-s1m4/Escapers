import { BrowserRouter, Routes, Route } from 'react-router'
import AdminRouter from './admin/Router'
import RoomsRouter from './rooms/Router'
export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/rooms/*' element={<RoomsRouter />} />
				<Route path='/admin/*' element={<AdminRouter />} />
				<Route path='*' element={<h2>Not Found</h2>} />
			</Routes>
		</BrowserRouter>
	)
}