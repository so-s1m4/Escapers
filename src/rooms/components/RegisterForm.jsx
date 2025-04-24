import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import arrow from 'img/arrow-right.svg'

import css from 'rooms/css/RegisterForm.module.css'
import SignatureCanvas from 'react-signature-canvas'
import { Client, Room } from 'utils/apiController.ts'
import throwError from 'utils/throwError.ts'

function Register({ state, comp }) {
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
							<input
								type='text'
								required
								name='firstName'
								onChange={e => {
									comp.setState({ firstName: e.target.value })
								}}
							/>
						</div>
						<div className={css.inputWrapper}>
							<div className={css.inputTitle}>Last Name *</div>
							<input
								type='text'
								required
								name='lastName'
								onChange={e => {
									comp.setState({ lastName: e.target.value })
								}}
							/>
						</div>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Birthday *</div>
						<input
							type='date'
							required
							name='birthday'
							onChange={e => {
								comp.setState({ birthday: e.target.value })
							}}
						/>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Phone</div>
						<input
							type='phone'
							placeholder='+43123456789'
							name='phone'
							onChange={e => {
								comp.setState({ phone: e.target.value })
							}}
							birthday
						/>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Email</div>
						<input
							type='mail'
							placeholder='example@gmail.com'
							name='email'
							onChange={e => {
								comp.setState({ mail: e.target.value })
							}}
						/>
					</div>
					<h5 style={{ marginTop: '-1.5rem' }}>* Pflichtfeld</h5>

					<button
						className={css.btn}
						onClick={() => {
							comp.setState({ step: 2 })
						}}
					>
						Weiter <img src={arrow}></img>
					</button>
				</form>
				<h4>
					Haben Sie bereits einen Pass?{' '}
					<h10
						onClick={() => {
							comp.setState({ step: 1 })
						}}
					>
						Anmelden
					</h10>
				</h4>
			</>
		</div>
	)
}
function Login({ state, comp }) {
	return (
		<div className={css.wrapper} style={{ padding: '1rem' }}>
			<>
				<h2>Einloggen</h2>
				<form
					action='js:void(0)'
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
					}}
				>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Code</div>
						<input
							type='number'
							placeholder='1234'
							name='code'
							onChange={e => {
								comp.setState({ code: e.target.value })
							}}
						/>
					</div>
					<div className={css.inputWrapper}>
						<div className={css.inputTitle}>Password</div>
						<input
							type='password'
							name='password'
							onChange={e => {
								comp.setState({ password: e.target.value })
							}}
						/>
					</div>
					<button
						className={css.btn}
						onClick={async () => {
							Client.getClient(comp.state.code, comp.state.password)
								.then(res => {
									if (res.data) {
										comp.setState({ step: 2 })
									}
								})
								.catch(err => {
									throwError(404, 'Invalid code or password')
								})
						}}
					>
						Weiter <img src={arrow}></img>
					</button>
				</form>
				<h4>
					Haben Sie noch keinen Pass?{' '}
					<h10
						onClick={() => {
							comp.setState({ step: 0 })
						}}
					>
						Registrieren
					</h10>
				</h4>
			</>
		</div>
	)
}
function EULE({ state, comp }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				background: '#111',
				color: 'var(--color-orange)',
				padding: 20,
				overflowY: 'auto',
			}}
		>
			<h1 style={{ fontSize: '1.2em', marginBottom: 20 }}>
				Einverständniserklärung für die Teilnahme an einem Spiel oder Quest
			</h1>

			<ol style={{ paddingLeft: 20, marginBottom: 30 }}>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Bei der Buchung eines Spiels auf der Seite https://escapers.at selbst
					oder mit Hilfe eines Fachberaters unter der Telefonnummer: +43 676
					9101254 habe ich mich mit den Spielregeln vertraut gemacht, die Regeln
					für die Erbringung von Dienstleistungen auf der Website unter der
					Webadresse: https://escapers.at. Ich stimme den Regeln voll und ganz
					zu, habe keine Einwände, verstehe und akzeptiere die Regeln.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Vor der Buchung einer Sitzung habe ich die auf der Website
					präsentierte Nutzungsvereinbarung gelesen und akzeptiert, die sich
					unter der Webadresse: https://escapers.at befindet. Ich akzeptiere die
					Vereinbarung zum öffentlichen Angebot.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich verstehe, dass dieses Spiel das Vorhandensein von Risiken
					verschiedener Verletzungen aufgrund von Fahrlässigkeit beinhaltet.
					Obwohl die Einhaltung bestimmter Spielregeln, Sicherheitsregeln,
					technischer Vorschriften, der Verwendung spezieller Ausrüstung und der
					persönlichen Disziplin diese Risiken verringern kann, bleibt das
					Risiko schwerer Verletzungen bestehen. Mir ist bewusst, dass es sich
					bei den Unterhaltungsangeboten der Internetressource: Escapers GmbH um
					Spiele handelt, die zu Verletzungen führen können.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich übernehme wissentlich und freiwillig die Verantwortung für diese
					Risiken – sowohl bekannte als auch unbekannte, einschließlich Risiken,
					die sich aus der Fahrlässigkeit der Veranstalter, Ausführenden oder
					anderer Personen ergeben. Ich übernehme die volle Verantwortung für
					meine Teilnahme an den Spielen der Escapers GmbH. Sollte ich während
					meiner Anwesenheit oder Teilnahme an den Spielen eine nicht übliche
					oder erhebliche Gefahr für Leben oder Gesundheit feststellen,
					verpflichte ich mich, meine Teilnahme am Spiel einzustellen und den
					Veranstalter sowie die Ausführenden unverzüglich mündlich oder per
					Telefon zu informieren.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich stimme freiwillig zu, alle allgemein anerkannten Anforderungen und
					Bedingungen für die Teilnahme an diesem Spiel einzuhalten.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Im Falle von Verletzungen oder Todesfällen entbinde ich hiermit in
					meinem eigenen Namen und im Namen meiner Erben, Rechtsnachfolger oder
					Vertreter und Angehörigen von der Haftung und Verfolgung der
					Veranstalter der Escapers GmbH, Administratoren, andere Darsteller und
					Freizeitaktivitäten.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Durch diese Vereinbarung erteile ich mein Einverständnis zur
					Verarbeitung personenbezogener Daten, für Videoaufnahmen, Fotografien
					und Audioaufnahmen meiner Stimme im laufenden Spiel, sowie zur Nutzung
					dieser Materialien für Marketingzwecke und – im Falle eines
					Rechtsverstoßes – zur Vorlage bei Strafverfolgungsbehörden.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich verstehe, dass Personen mit Krankheiten wie Geistesstörungen,
					Herzkrankheiten, Atemwegserkrankungen, Asthma, Epilepsie oder anderen
					Gesundheitsproblemen von der Teilnahme ausgeschlossen sind. Durch
					diese Erklärung bestätige ich, dass ich an keiner der oben genannten
					Erkrankungen leide.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Während, vor oder nach dem Spiel verpflichte ich mich, die
					Spielrequisiten und das Eigentum der Escapers GmbH nicht vorsätzlich
					oder fahrlässig zu beschädigen. Im Falle eines Verstoßes gegen diese
					Regel verpflichte ich mich, den entstandenen Schaden zu ersetzen.
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich verstehe und akzeptiere die folgenden Einschränkungen für
					Virtual-Reality-Spiele:
					<ul>
						<li
							style={{
								marginBottom: 15,
							}}
						>
							Teilnahme nicht empfohlen für Personen mit Anfallserkrankungen.
						</li>
						<li
							style={{
								marginBottom: 15,
							}}
						>
							Mindestalter 13 Jahre (mit Elternbegleitung).
						</li>
						<li
							style={{
								marginBottom: 15,
							}}
						>
							Einige Spiele enthalten beängstigende Szenen und können
							Altersbeschränkungen haben.
						</li>
						<li
							style={{
								marginBottom: 15,
							}}
						>
							Farbliche Unterscheidungen können für Farbenblinde problematisch
							sein.
						</li>
						<li
							style={{
								marginBottom: 15,
							}}
						>
							Tonlautstärke begrenzt auf 93 dB. Bei Unbehagen muss der Betreiber
							sofort informiert werden.
						</li>
					</ul>
				</li>
				<li
					style={{
						marginBottom: 15,
					}}
				>
					Ich ermächtige die Escapers GmbH, meine personenbezogenen Daten zu
					erheben, zu speichern, zu verarbeiten und zu nutzen, um mit mir zu
					kommunizieren, SMS-Benachrichtigungen über Aktionen, Rabatte und
					Umfragen zu versenden.
				</li>
			</ol>
			<p
				class='note'
				style={{
					fontSize: '0.9rem',
					marginTop: 30,
				}}
			>
				Bei minderjährigen Teilnehmern (unter 16 Jahren zum Zeitpunkt des
				Spiels) kommt der Vertrag nach österreichischem Recht durch die
				Eltern/Erziehungsberechtigten zustande.
			</p>
			<button
				className={css.btn}
				style={{ marginTop: 20 }}
				onClick={() => {
					comp.setState({ step: 3 })
				}}
			>
				Ich stimme zu <img src={arrow}></img>
			</button>
		</div>
	)
}
function Signature({ state, comp }) {
	const canvasRef = useRef(null)
	return (
		<div
			className={css.wrapper}
			style={{
				padding: '1rem',
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				gap: '.5rem',
			}}
		>
			<SignatureCanvas
				ref={canvasRef}
				penColor='blue'
				canvasProps={{
					width: window.innerWidth,
					height: window.innerHeight * 0.25,
				}}
				backgroundColor='white'
				onEnd={comp.handleSignatureChange}
			/>
			<button
				className={css.btn}
				onClick={() => {
					canvasRef.current.clear()
				}}
				style={{ background: 'red', color: 'white', border: 'none' }}
			>
				Reset
			</button>
			<button
				className={css.btn}
				onClick={() => {
					comp.finishRegister()
				}}
			>
				Join <img src={arrow}></img>
			</button>
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
			mail: '',
			phone: '',
			code: '',
			password: '',
			check: false,
			step: 0,
			signatureBase64: null,
		}
		this.handleSignatureChange = this.handleSignatureChange.bind(this)
	}
	componentDidMount() {
		this.state.roomId = window.location.pathname.split('/')[2]
	}
	handleSignatureChange(event) {
		this.setState({ signatureBase64: event.base64 })
	}
	finishRegister() {
		let data
		if (this.state.code && this.state.password) {
			data = {
				code: this.state.code,
				password: this.state.password,
			}
			Client.getClient(this.state.code, this.state.password)
				.then(res => {
					Room.addClientToRoom(
						this.state.roomId,
						res.data.id,
						this.state.signatureBase64,
						res.data.password
					)
						.then(res => {
							throwError(200, 'Client added to room', JSON.stringify(res.data))
						})
						.catch(err => {
							throwError(404, err.response.data.message)
						})
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			data = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				birthday: this.state.birthday,
				mail: this.state.mail,
				phone: this.state.phone,
			}
			Client.register(null, data)
				.then(res => {
					const client = res.data
					Room.addClientToRoom(
						this.state.roomId,
						client.id,
						this.state.signatureBase64,
						client.password
					)
						.then(res => {
							console.log(res.data)
						})
						.catch(err => {
							throwError(404, err.response.data.message)
						})
				})
				.catch(err => {
					throwError(404, err.response.data.message)
				})
		}
	}
	render() {
		switch (this.state.step) {
			case 0:
				return <Register state={this.state} comp={this} />
			case 1:
				return <Login state={this.state} comp={this} />
			case 2:
				return <EULE state={this.state} comp={this} />
			case 3:
				return <Signature state={this.state} comp={this} />
			default:
				break
		}
	}
}

export default RegisterForm
