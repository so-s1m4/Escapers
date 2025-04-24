import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import arrow from 'img/arrow-right.svg'

import css from 'rooms/css/RegisterForm.module.css'

function Daten({ state }) {
	const webRef = useRef(null)

	console.log(state)

	return (
		<div className={css.wrapper} style={{ padding: '1rem' }}>
			<>
				<h2>Einverständniserklärung</h2>
				<form
					action='submit'
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
					}}
				>
					<div className={css.inline} style={{ gap: '2rem' }}>
						<div className={css.inputWrapper}>
							<div className={css.inputTitle}>First Name *</div>
							<input type='text' required name='firstName' />
						</div>
						<div className={css.inputWrapper}>
							<div className={css.inputTitle}>Last Name *</div>
							<input type='text' required name='lastName' />
						</div>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Birthday *</div>
						<input type='date' required name='birthday' />
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Phone</div>
						<input
							type='phone'
							placeholder='+43123456789'
							name='phone'
						/>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Email</div>
						<input
							type='email'
							placeholder='example@gmail.com'
							name='email'
						/>
					</div>
					<h5 style={{ marginTop: '-1.5rem' }}>* Pflichtfeld</h5>

					<button className={css.btn}>
						Weiter <img src={arrow}></img>
					</button>
				</form>
				<h4>
					Haben Sie bereits einen Pass? <a>Anmelden</a>
				</h4>
			</>
		</div>
	)
}

class RegisterForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			birthday: '',
			email: '',
			phone: '',
			check: false,
			step: 0,
		}
	}
	render() {
		return (
			<Routes>
				<Route path='/' element={<Daten state={this.state} />} />
				<Route path='/form' element={null} />
			</Routes>
		)
	}
}

export default RegisterForm
