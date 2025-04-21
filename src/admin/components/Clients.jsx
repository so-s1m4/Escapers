import css from 'admin/css/Clients.module.css'
import { useEffect, useRef, useState } from 'react'
import { Client } from 'utils/apiController.ts'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PassportCardDocument } from './passport-card-util'
import bg from 'img/passportTemplate.jpg'


export default function Clients() {
	const pdfRef = useRef(null)
	const [filter, setFilter] = useState({})
	const [clients, setClients] = useState([])
	const [loading, setLoading] = useState(true)

	const updateFilter = () => {
		const elements = Array.from(document.querySelectorAll('input'))
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
	}, [])

	return (
		<>
			<div className={css.nav}>
				<div className={css.title}>Clients</div>
				<div className={css.filters}>
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
				</div>
			</div>
			<div className={css.content}>
				<table className={css.table}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Password</th>
							<th>Name</th>
							<th>Birthday</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Passport</th>
						</tr>
					</thead>
					<tbody>
						{clients
							.filter(
								cl =>
									cl.firstName.includes(filter.firstname) &&
									cl.lastName.includes(filter.lastname) &&
									cl.birthday.includes(filter.birthday) &&
									cl.phone?.includes(filter.phone) &&
									cl.mail?.includes(filter.email)
							)
							.map((client, index) => {
								console.log(client)
								return (
									<tr key={index}>
										<td>{"0".repeat(6 - (""+client.id).length) + client.id}</td>
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
											{new Date().getFullYear() -
												new Date(client.birthday).getFullYear()}{' '}
											years)
										</td>
										<td>{client.phone}</td>
										<td>{client.mail}</td>
										<td>
											<PDFDownloadLink
												document={PassportCardDocument({
													name: client.firstName,
													idNumber: "0".repeat(6 - (""+client.id).length)+ client.id,
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
												}}
											>
												{({ loading }) =>
													loading ? 'Generating…' : 'Download'
												}

											</PDFDownloadLink>
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
