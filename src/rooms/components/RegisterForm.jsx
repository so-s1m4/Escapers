import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Webcam from 'react-webcam'

import css from 'rooms/css/RegisterForm.module.css'

function RegFormStart({ state }) {
	const webRef = useRef(null)

	console.log(state)

	return (
		<div className={css.wrapper}>
			<>
				<h2>Register</h2>
				<form
					action='submit'
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
						padding: '0 1rem',
					}}
				>
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
					>
						<div className={css.inline} style={{ gap: '2rem' }}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '2rem',
									width: '100%',
								}}
							>
								{state.state.image ? (
									<img
										src={state.state.image}
										alt='Preview'
										style={{
											maxWidth: window.innerWidth * 0.37,
											height: window.innerHeight * 0.25,
											objectFit: 'cover',
											imageResolution: 'from-image',
											imageRendering: 'pixelated',
											objectPosition: 'center',
											borderRadius: '1rem',
											border: '2px solid var(--color-orange)',
										}}
									/>
								) : (
									<Webcam
										ref={webRef}
										audio={false}
										screenshotFormat='image/jpeg'
										imageSmoothing={true}
										zoom={10}
										screenshotQuality={1}
										style={{
											display: 'flex',
											justifyContent: 'flex-start',
											alignItems: 'flex-start',
											width: 'fit-content',
											maxWidth: window.innerWidth * 0.37,
											height: '25svh',
											borderRadius: '1rem',
											border: '2px solid var(--color-orange)',
										}}
									/>
								)}
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '2rem',
									width: '100%',
								}}
							>
								<div className={css.inputWrapper}>
									<div className={css.inputTitle}>First Name</div>
									<input type='text' required name='firstName' />
								</div>
								<div className={css.inputWrapper}>
									<div className={css.inputTitle}>Last Name</div>
									<input type='text' required name='lastName' />
								</div>
								<div className={css.inputWrapper}>
									<div className={css.inputTitle}>Birthday</div>
									<input type='date' required name='birthday' />
								</div>
							</div>
						</div>
						<div className={css.inline} style={{ gap: '2rem' }}>
							{state.state.image ? (
								<button
									className={css.btn}
									type='button'
									onClick={() => {
										state.setState({ image: null })
									}}
								>
									Make another one
								</button>
							) : (
								<button
									className={css.btn}
									type='button'
									onClick={() => {
										const image = {
											image: webRef.current.getScreenshot({
												width: 3456,
												height: 4608,
											}),
										}
										state.setState(image)
									}}
								>
									Take a picture
								</button>
							)}

							<div className={css.inputWrapper}>
								<div className={css.inputTitle}>Phone</div>
								<input
									type='phone'
									placeholder='+43 123 456 789'
									required
									name='phone'
								/>
							</div>
						</div>
						<div className={css.inline} style={{ gap: '2rem' }}>
							<div className={css.inputWrapper}>
								<div className={css.inputTitle}>Email</div>
								<input
									type='email'
									placeholder='example@gmail.com'
									required
									name='email'
								/>
							</div>
						</div>
					</div>

					<button className={css.btn}>Register</button>
				</form>
			</>
		</div>
	)
}
function RegFormStep() {
	return <h2>Register Form step</h2>
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
				<Route path='/' element={<RegFormStart state={this} />} />
				<Route path='/form' element={<RegFormStep state={this} />} />
			</Routes>
		)
	}
}

export default RegisterForm
