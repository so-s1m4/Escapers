import React from 'react'
import css from 'admin/css/Layout.module.css'
import logo from 'img/logo.png'

import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
	const navigate = useNavigate()

	return (
		<>
			<div className={css.nav}>
				<img
					onClick={() => navigate('/admin')}
					src={logo}
					alt='Logo'
					style={{ cursor: 'pointer' }}
				/>

				<div className={css.navList}>
					<div onClick={() => navigate('/admin/rooms')}>Rooms</div>
					<div onClick={() => navigate('/admin/clients')}>Clients</div>
					<div onClick={() => navigate('/admin/bookings')}>Bookings</div>
				</div>
			</div>
			<div className={css.wrapper}>{children}</div>
		</>
	)
}
