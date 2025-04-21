import { BrowserRouter, Routes, Route } from 'react-router'
import AdminRouter from './admin/Router'
import RoomsRouter from './rooms/Router'
import css from "./index.module.css"


export default function Router() {
	return (
		<>
			<div className={css.errors} id="errors-wrapper">
						
			</div>
			<BrowserRouter>
				<Routes>
					<Route path='/rooms/*' element={<RoomsRouter />} />
					<Route path='/admin/*' element={<AdminRouter />} />
					<Route path='*' element={<h2>Not Found</h2>} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
