import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import AdminRouter from './admin/Router'
import RoomsRouter from './rooms/Router'
import css from "./index.module.css"


export default function Router() {
	return (
		<>
			<div className={css.errors} id='errors-wrapper'></div>
			<BrowserRouter>
				<Routes>
					<Route path='/rooms/*' element={<RoomsRouter />} />
					<Route path='/admin/*' element={<AdminRouter />} />
					<Route path='*' element={<Navigate to='/admin' />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
