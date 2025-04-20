import { withRouter } from 'utils/withRouter'
import ComponentWithStore from 'utils/ComponentWithStore'

import css from './SuperAdmin.module.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Admin, Game, Location } from 'utils/apiController.ts'
import { useEffect, useState } from 'react'

function Admins({ store }) {
	const [admins, setAdmins] = useState([])
	const [update, setUpdate] = useState(false)

	const createAdmin = async () => {
		const admin = await Admin.addAdmin({
			username: document.querySelector('input[name="username"]').value,
			firstName: document.querySelector('input[name="firstName"]').value,
			lastName: document.querySelector('input[name="lastName"]').value,
			password: document.querySelector('input[name="password"]').value,
		})
			.then(async res => {
				const locations =
					Array.from(
						document.querySelector('select[name="locations"]').selectedOptions
					).map(option => option.value) || []

				locations.forEach(async locationId => {
					await Location.addAdminToLocation(res.data.id, locationId).then(
						res => {
							if (!res.success) {
								console.error('Failed to add admin to location')
								return
							}
						}
					)
				})
			})
			.finally(() => {
				setUpdate(!update)
			})
			.catch(err => {
				console.error(err)
			})
	}

	const updateAdmin = async gameId => {}

	useEffect(() => {
		const fetchAdmin = async () => {
			const admins = await Admin.getAdmins().then(res => {
				if (!res.success) {
					console.error('Failed to fetch admins')
					return
				}
				let data = res.data

				data = data.map(async admin => {
					return await Location.getAdminLocations(admin.id).then(res => {
						admin = { ...admin, locs: Array.from(res.data) }
						return admin
					}).catch(err => {
						console.error(err)
					})
				})
				return Promise.all(data)
			})
			setAdmins(admins)
		}

		fetchAdmin()
	}, [update])

	return (
		<>
			<h1>Admins</h1>
			<table className={css.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Locations</th>
						<th>Password</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td></td>
						<td>
							<input className={css.inputField} type='text' name='username' />
						</td>
						<td>
							<input className={css.inputField} type='text' name='firstName' />
						</td>
						<td>
							<input className={css.inputField} type='text' name='lastName' />
						</td>
						<td>
							<select
								className={css.inputField}
								name='locations'
								id=''
								multiple
							>
								{store.state.myLocations.map(location => {
									return (
										<option key={location.id} value={location.id}>
											{location.address}, {location.postcode}
										</option>
									)
								})}
							</select>
						</td>
						<td>
							<input
								className={css.inputField}
								type='password'
								name='password'
							/>
						</td>
						<td>
							<button className={css.createBtn} onClick={createAdmin}>
								Create
							</button>
						</td>
					</tr>
					{admins.map(admin => {
						return (
							<tr className={css.tableRow} key={admin.id} id={admin.id}>
								<td>{admin.id}</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={admin.username}
										disabled
										name={`tr${admin.id}`}
									></input>
								</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={admin.firstName}
										disabled
										name={`tr${admin.id}`}
									></input>
								</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={admin.lastName}
										type='text'
										name={`tr${admin.id}`}
										disabled
									></input>
								</td>
								<td>
									{admin.locs?.map(location => {
										return (
											<div style={{ textWrap: 'nowrap' }}>
												{location.address}, {location.postcode}
											</div>
										)
									})}
								</td>
								<td></td>
								<td>
									<button
										onClick={() => {
											const elements = document.getElementsByName(
												`tr${admin.id}`
											)
											elements.forEach(element => {
												if (!element.disabled) {
													updateAdmin(admin.id)
												}
												element.disabled = !element.disabled
											})
										}}
									>
										Edit
									</button>
									{!admin.isSuperAdmin && (
										<button
											onClick={async () => {
												Admin.deleteAdmin(admin.id).then(res => {
													res.success &&
														setAdmins(admins.filter(a => a.id !== admin.id))
												})
											}}
										>
											Delete
										</button>
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
function Games({ store }) {
	const [games, setGames] = useState([])


	const createGame = async () => {
		const file = document.querySelector('input[name="file"]').files[0]

		const data = {
			name: document.querySelector('input[name="name"]').value,
			color: document.querySelector('input[name="color"]').value,
			maxPlayers: document.querySelector('input[name="maxPlayers"]').value,
		}

		Game.addGameToLocation(store.state.curLocation, {
			file,
			data: JSON.stringify(data),
		})
			.then(res => {
				if (res.success) {
					store.state.games.push(res.data)
					store.state.games = store.state.games.filter(g => 1 == 1)

					store.setState({ games: store.state.games })
				}
			})
			.catch(err => {
				console.error(err)
			})
	}
	const updateGame = async gameId => {
		const file = document.getElementById(`tr${gameId}Icon`).files
		const data = {
			name: document.querySelector(`#tr${gameId}Name`).value,
			color: document.querySelector(`#tr${gameId}Color`).value,
			maxPlayers: document.querySelector(`#tr${gameId}maxPlayers`).value,
		}

		Game.updateLocationGame(store.state.curLocation, gameId, {
			...(file ? {file:file[0]} : {}),
			data: JSON.stringify(data),
		})
			.then(res => {
				console.log(res)
				if (res.success) {

					Game.getLocationsGames(store.state.curLocation).then(res => {
						if (!res.success) {
							console.error('Failed to fetch games')
							return
						}
						store.state.games = res.data
						setGames(res.data)
					})
					store.state.games = store.state.games.filter(g => 1 == 1)
					store.setState({ games: store.state.games })
				}
			})
			.catch(err => {
				console.error(err)
			})
	}

	useEffect(() => {
		const fetchGames = async () => {
			const response = await Game.getLocationsGames(store.state.curLocation)
			if (!response.success) {
				console.error('Failed to fetch games')
				return
			}
			setGames(response.data)
		}

		if (store.state.curLocation) fetchGames()
			
	}, [store.state.games, store.state.curLocation])

	return (
		<>
			<h1>Games</h1>
			<table className={css.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Color</th>
						<th>Icon</th>
						<th>Max Players</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td></td>
						<td>
							<input className={css.inputField} type='text' name='name' />
						</td>
						<td>
							<input className={css.inputField} type='color' name='color' />
						</td>
						<td>
							<input
								className={css.inputField}
								type='file'
								accept='.png,.jpeg,.gif'
								name='file'
							/>
						</td>
						<td>
							<input
								className={css.inputField}
								type='number'
								name='maxPlayers'
							/>
						</td>
						<td>
							<button className={css.createBtn} onClick={createGame}>
								Create
							</button>
						</td>
					</tr>
					{games.map(game => {
						return (
							<tr className={css.tableRow} key={game.id} id={game.id}>
								<td>{game.id}</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={game.name}
										disabled
										name={`tr${game.id}`}
										id={`tr${game.id}Name`}
									></input>
								</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={game.color}
										type='color'
										name={`tr${game.id}`}
										id={`tr${game.id}Color`}
										disabled
									></input>
								</td>
								<td>
									<input
										className={css.inputField}
										type='file'
										name={`tr${game.id}`}
										id={`tr${game.id}Icon`}
										disabled
									></input>
								</td>
								<td>
									<input
										defaultValue={game.maxPlayers}
										className={css.inputField}
										type='number'
										name={`tr${game.id}`}
										id={`tr${game.id}maxPlayers`}
										disabled
									></input>
								</td>
								<td>
									<button
										onClick={() => {
											const elements = document.getElementsByName(
												`tr${game.id}`
											)
											elements.forEach(element => {
												
												element.disabled = !element.disabled
											})
											if (elements[0].disabled) {
													updateGame(game.id)
												}
										}}
									>
										Edit
									</button>

									<button
										onClick={async () => {
											await Game.deleteGameFromLocation(
												store.state.curLocation,
												game.id
											)
											store.state.games = store.state.games.filter(
												g => g.id !== game.id
											)
											store.setState({ games: store.state.games })
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
function Locations({ store }) {
	const [locs, setLocations] = useState([])
	const [UpdateHandler, update] = useState(false);

	const createLoc = async () => {

		const data = {
			address: document.querySelector('input[name="address"]').value,
			city: document.querySelector('input[name="city"]').value,
			postcode: document.querySelector('input[name="postcode"]').value,
			mail: document.querySelector('input[name="email"]').value,
			phone: document.querySelector('input[name="phone"]').value,
		}

		Location.addLocation(data)
			.then(res => {
				if (res.success) {
					store.state.myLocations.push(res.data)
					setLocations(store.state.myLocations)
					store.state.myLocations = store.state.myLocations.filter(g => 1 == 1)

					store.setState({ myLocations: store.state.myLocations })
				}
			})
			.catch(err => {
				console.error(err)
			})
	}
	const updateLoc = async locId => {
		const data = {
			address: document.querySelector(`#tr${locId}Address`).value,
			city: document.querySelector(`#tr${locId}City`).value,
			postcode: document.querySelector(`#tr${locId}Postcode`).value,
			mail: document.querySelector(`#tr${locId}Email`).value,
			phone: document.querySelector(`#tr${locId}Phone`).value,
		}

		Location.updateLocation(locId, data)
			.then(res => {
				if (res.success) {
					update(!UpdateHandler)
				}
			})
			.catch(err => {
				console.error(err)
			})
	}

	useEffect(() => {
		const fetchLocs = async () => {
			const response = await Location.getLocations()
			if (!response.success) {
				console.error('Failed to fetch locs')
				return
			}
			setLocations(response.data)
		}

		fetchLocs()
	}, [UpdateHandler])

	return (
		<>
			<h1>Locations</h1>
			<table className={css.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Adress</th>
						<th>City</th>
						<th>POST_CODE</th>
						<th>Phone</th>
						<th>Mail</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td></td>
						<td>
							<input className={css.inputField} type='text' name='address' />
						</td>
						<td>
							<input className={css.inputField} type='text' name='city' />
						</td>
						<td>
							<input className={css.inputField} type='number' name='postcode' />
						</td>
						<td>
							<input className={css.inputField} type='phone' name='phone' />
						</td>
						<td>
							<input className={css.inputField} type='email' name='email' />
						</td>
						<td>
							<button className={css.createBtn} onClick={createLoc}>
								Create
							</button>
						</td>
					</tr>
					{locs.map(loc => {
						return (
							<tr className={css.tableRow} key={loc.id} id={loc.id}>
								<td>{loc.id}</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={loc.address}
										disabled
										name={`tr${loc.id}`}
										id={`tr${loc.id}Address`}
									></input>
								</td>
								<td>
									<input
										className={css.inputField}
										defaultValue={loc.city}
										type='text'
										name={`tr${loc.id}`}
										id={`tr${loc.id}City`}
										disabled
									></input>
								</td>
								<td>
									<input
										defaultValue={loc.postcode}
										className={css.inputField}
										type='number'
										name={`tr${loc.id}`}
										id={`tr${loc.id}Postcode`}
										disabled
									></input>
								</td>
								<td>
									<input
										defaultValue={loc.phone}
										className={css.inputField}
										type='phone'
										name={`tr${loc.id}`}
										id={`tr${loc.id}Phone`}
										disabled
									></input>
								</td>
								<td>
									<input
										defaultValue={loc.mail}
										className={css.inputField}
										type='email'
										name={`tr${loc.id}`}
										id={`tr${loc.id}Email`}
										disabled
									></input>
								</td>
								<td>
									<button
										onClick={() => {
											const elements = document.getElementsByName(`tr${loc.id}`)
											elements.forEach(element => {
												element.disabled = !element.disabled
											})
											if (elements[0].disabled) {
												updateLoc(loc.id)
											}
										}}
									>
										Edit
									</button>

									<button
										onClick={async () => {
											Location.deleteLocation(loc.id).then(res => {
												if (res.success) {
													store.state.myLocations = locs.filter(
														l => l.id !== loc.id
													)
													store.setState({
														myLocations: store.state.myLocations
													})
													setLocations(locs.filter(l => l.id !== loc.id))
												}
											})
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

class SuperAdmin extends ComponentWithStore {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.store.register(this)
	}
	componentDidUpdate() {
		if (!this.store.state.myInfo.isSuperAdmin) {
			this.props.nav('/admin')
		}
	}
	render() {
		return (
			<div className={css.container}>
				<div className={css.nav}>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/admins')}
					>
						Admins
					</div>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/games')}
					>
						Games
					</div>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/locations')}
					>
						Locations
					</div>
				</div>
				<div className={css.content}>
					<Routes>
						<Route path='/admins' element={<Admins store={this.store} />} />
						<Route path='/games' element={<Games store={this.store} />} />
						<Route
							path='/locations'
							element={<Locations store={this.store} />}
						/>
					</Routes>
				</div>
			</div>
		)
	}
}

export default withRouter(SuperAdmin)