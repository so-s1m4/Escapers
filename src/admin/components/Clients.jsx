import css from 'admin/css/Clients.module.css'
import { useEffect, useRef, useState } from 'react'
import { Client } from 'utils/apiController.ts'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PassportCardDocument } from './passport-card-util'
import throwError from 'utils/throwError.ts'
import bg from 'img/passportTemplate.jpg'
import bg2 from 'img/passportTemplate2.jpg'
import qr from 'img/qr.png'
import { refresh, edit, can } from 'img/svgs'

export default function Clients() {
	const pdfRef = useRef(null)
	const [filter, setFilter] = useState({})
	const [clients, setClients] = useState([])
	const [isUpdating, update] = useState(true)

	const createClient = async e => {
		e.preventDefault()
		const elements = Array.from(document.forms.createClient.children)
		const data = {}
		let file
		elements
			.filter(elem => elem.nodeName == 'INPUT')
			.forEach(elem => {
				if (elem.type != 'file') {
					if (elem.value != '') {
						data[elem.name] = elem.value
					}
				} else file = elem.files[0]
			})
		await Client.register(file, data).catch(err =>
			throwError(err.response.status, err.response.data.message)
		)
		update(!isUpdating)
	}

	const updateFilter = () => {
		const elements = Array.from(document.querySelectorAll('#filters input'))
		const data = {}
		elements.forEach(element => {
			data[element.name] = element.value
		})
		setFilter(data)
	}

	useEffect(() => {
		Client.getClients().then(res => {
			setClients(res.data)
		})
		updateFilter()
	}, [isUpdating])

	return (
		<>
			<div className={css.nav}>
				<div className={css.title}>Clients</div>
				<form
					className={css.filters}
					name='createClient'
					onSubmit={createClient}
				>
					<h2>Create</h2>

					<input
						name='firstName'
						placeholder='First name'
						className={css.inputField}
						required
					></input>
					<input
						name='lastName'
						placeholder='Last name'
						className={css.inputField}
						required
					></input>
					<input
						name='birthday'
						type='date'
						placeholder='Birthday'
						className={css.inputField}
						required
					></input>
					<input
						name='phone'
						type='phone'
						placeholder='Phone'
						className={css.inputField}
						required
					></input>
					<input
						name='mail'
						type='email'
						placeholder='Email'
						className={css.inputField}
					></input>
					<input
						defaultValue={''}
						name='file'
						type='file'
						placeholder='Icon'
						className={css.inputField}
						required
					></input>
					<button className={css.createBtn}>Create</button>
				</form>
			</div>
			<div className={css.content}>
				<table className={css.table} style={{ position: 'relative' }}>
					<thead>
						<tr id='filters'>
							<th>
								<input
									defaultValue={''}
									onChange={() => updateFilter()}
									name='id'
									placeholder='ID'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									defaultValue={''}
									onChange={() => updateFilter()}
									name='password'
									placeholder='Password'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									onChange={() => updateFilter()}
									name='lastname'
									placeholder='Last name'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									onChange={() => updateFilter()}
									name='firstname'
									placeholder='First name'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									onChange={() => updateFilter()}
									name='birthday'
									type='date'
									placeholder='Birthday'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									onChange={() => updateFilter()}
									name='phone'
									type='phone'
									placeholder='Phone'
									className={css.inputField}
								></input>
							</th>
							<th>
								<input
									onChange={() => updateFilter()}
									name='email'
									type='email'
									placeholder='Email'
									className={css.inputField}
								></input>
							</th>
						</tr>
						<tr>
							<th>ID</th>
							<th>Password</th>
							<th>Last name</th>
							<th>First name</th>
							<th>Birthday</th>
							<th>Phone</th>
							<th>Email</th>
							<th colSpan={1}>Passport</th>
							<th colSpan={2}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{clients
							.filter(
								cl =>
									cl.id.toString().includes(filter.id) &&
									cl.password.includes(filter.password) &&
									cl.firstName.startsWith(filter.firstname) &&
									cl.lastName.startsWith(filter.lastname) &&
									cl.birthday.includes(filter.birthday) &&
									((!cl.mail && !filter.email) ||
										(cl.mail && cl.mail.startsWith(filter.email))) &&
									((!cl.phone && !filter.phone) ||
										(cl.phone && cl.phone.startsWith(filter.phone)))
							)
							.map((client, index) => {
								return (
									<tr key={index} id={`clientRow${client.id}`}>
										<td>{client.id}</td>
										<td>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
													width: '100%',
													height: '100%',

												}}
											>
												<span>{client.password}</span>
												<input
													onClick={e => Client.regeneratePsw(client.id)}
													type='image'
													src={refresh}
													alt='change password'
													disabled
												></input>
											</div>
										</td>
										<td>
											<input
												className={css.inputField}
												type='text'
												defaultValue={client.lastName}
												name='lastName'
												disabled
											></input>{' '}
										</td>
										<td>
											<input
												className={css.inputField}
												type='text'
												defaultValue={client.firstName}
												name='firstName'
												disabled
											></input>
										</td>
										<td>
											{new Date(client.birthday).toLocaleDateString('ua-Ua', {
												month: '2-digit',
												day: '2-digit',
												year: 'numeric',
											})}{' '}
											(
											{Math.floor(
												(new Date() - new Date(client.birthday)) /
													1000 /
													60 /
													60 /
													24 /
													365.25
											)}{' '}
											years)
										</td>
										<td>
											<input
												className={css.inputField}
												type='phone'
												name='phone'
												defaultValue={client.phone}
												disabled
											></input>
										</td>
										<td>
											<input
												className={css.inputField}
												type='email'
												name='mail'
												defaultValue={client.mail}
												disabled
											></input>
										</td>
										<td>
											<PDFDownloadLink
												document={PassportCardDocument({
													name: client.firstName,
													idNumber:
														'0'.repeat(6 - ('' + client.id).length) + client.id,
													birthDate: new Date(
														client.birthday
													).toLocaleDateString('ua-Ua', {
														month: '2-digit',
														day: '2-digit',
														year: 'numeric',
													}),
													backgroundUrl: bg,
													backgroundUrl2: bg2,
													photo: client.photo,
													qr: qr,
													password: client.password,
												})}
												fileName='astronaut-passport-card.pdf'
												style={{
													textDecoration: 'none',
													padding: '8px 12px',
													backgroundColor: 'transparent',
													color: 'var(--color-orange)',
													border: '1px solid var(--color-orange)',
													borderRadius: 4,
													fontSize: 16,
												}}
											>
												{({ loading }) => (loading ? 'Genera...' : 'Download')}
											</PDFDownloadLink>
										</td>
										<td>
											<img
												src={edit}
												onClick={() => {
													const elements = Array.from(
														document.querySelectorAll(
															`#clientRow${client.id} input`
														)
													)
													elements.map(elem => {
														elem.disabled = !elem.disabled
													})
													if (elements[0].disabled) {
														let data = {}
														elements.forEach(elem => {
															if (elem.value) {
																data[elem.name] = elem.value
															}
														})
														console.log(data)
														Client.update(client.id, {
															data: JSON.stringify(data),
														})
													}
												}}
											></img>
										</td>
										<td>
											<img
												className={css.trash}
												onClick={async () => {
													await Client.delete(client.id)
													update(!isUpdating)
												}}
												src={can}
											></img>
										</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}
