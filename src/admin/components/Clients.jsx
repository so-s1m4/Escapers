import css from 'admin/css/Clients.module.css'
import { useEffect, useRef, useState } from 'react'
import { Client } from 'utils/apiController.ts'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PassportCardDocument } from './passport-card-util'
import throwError from 'utils/throwError.ts'
import bg from 'img/passportTemplate.jpg'
import pencil from 'img/pencil.svg'
import trash from 'img/trashcan.svg'

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
				if (elem.type != 'file') data[elem.name] = elem.value
				else file = elem.files[0]
			})
		await Client.register(file, data)
			// .then(res => {
			// 	elements.forEach(elem => {
			// 		elem.value = ''
			// 	})
			// })
			.catch(err => throwError(err.response.status, err.response.data.message))
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
				{/* <div className={css.filters} id='filters'>
					<h2>Filters</h2>
					<input
						defaultValue={''}
						onChange={() => updateFilter()}
						name='code'
						placeholder='Code'
						className={css.inputField}
					></input>
					<input
						onChange={() => updateFilter()}
						name='firstname'
						placeholder='First name'
						className={css.inputField}
					></input>
					<input
						onChange={() => updateFilter()}
						name='lastname'
						placeholder='Last name'
						className={css.inputField}
					></input>
					<input
						onChange={() => updateFilter()}
						name='birthday'
						type='date'
						placeholder='Birthday'
						className={css.inputField}
					></input>
					<input
						onChange={() => updateFilter()}
						name='phone'
						type='phone'
						placeholder='Phone'
						className={css.inputField}
					></input>
					<input
						onChange={() => updateFilter()}
						name='email'
						type='email'
						placeholder='Email'
						className={css.inputField}
					></input>
				</div> */}
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
					></input>
					<input
						name='lastName'
						placeholder='Last name'
						className={css.inputField}
					></input>
					<input
						name='birthday'
						type='date'
						placeholder='Birthday'
						className={css.inputField}
					></input>
					<input
						name='phone'
						type='phone'
						placeholder='Phone'
						className={css.inputField}
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
					></input>
					<button className={css.createBtn}>Create</button>
				</form>
			</div>
			<div className={css.content}>
				<table className={css.table} style={{ position: 'relative' }}>
					<thead>
						<tr id='filters'>
							<th style={{ border: 0 }}></th>
							<th>
								<input
									defaultValue={''}
									onChange={() => updateFilter()}
									name='code'
									placeholder='Code'
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
							<th>Name</th>
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
									cl.firstName.startsWith(filter.firstname) &&
									cl.lastName.startsWith(filter.lastname) &&
									cl.birthday.includes(filter.birthday) &&
									((!cl.mail && !filter.email) ||
										(cl.mail && cl.mail.startsWith(filter.email))) &&
									((!cl.phone && !filter.phone) ||
										(cl.phone && cl.phone.startsWith(filter.phone)))
							)
							.map((client, index) => {
								console.log(client)
								return (
									<tr key={index}>
										<td>
											{'0'.repeat(6 - ('' + client.id).length) + client.id}
										</td>
										<td>{client.password}</td>
										<td>
											{client.lastName} {client.firstName}
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
													365
											)}{' '}
											years)
										</td>
										<td>{client.phone}</td>
										<td>{client.mail}</td>
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
												{({ loading }) =>
													loading ? 'Genera...' : 'Download'
												}
											</PDFDownloadLink>
										</td>
										<td>
											<img src={pencil}></img>
										</td>
										<td>
											<img
												className={css.trash}
												onClick={async () => {
													await Client.delete(client.id)
													update(!isUpdating)
												}}
												src={trash}
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
