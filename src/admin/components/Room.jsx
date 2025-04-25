import ComponentWithStore from 'utils/ComponentWithStore'
import { Admin, Client, Room as RoomAPI } from 'utils/apiController.ts'
import { withRouter } from 'utils/withRouter'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FormularDocument } from './passport-card-util'
import throwError from 'utils/throwError.ts'
import css from 'admin/css/Room.module.css'
import trash from 'img/trashcan.svg'

class Room extends ComponentWithStore {
	constructor(props) {
		super()
		this.state = {
			roomId: props.params.id,
		}

		this.closeIt = this.closeIt.bind(this)
	}

	async closeIt() {
		this.state.room.isActivate = false
		this.store.state.rooms = this.store.state.rooms.map(room => {
			if (room.id == this.state.roomId) {
				room.isActivate = false
			}
			return room
		})
		this.store.setState({ rooms: this.store.state.rooms })

		await RoomAPI.closeRoom(this.state.roomId)
	}
	async update() {
		const room = this.store.state.rooms?.find(
			room => room.id == this.state.roomId
		)
		if (!room) {
			setTimeout(() => {
				this.update()
			}, 300)
			return
		} else {
			await Admin.getAdmin(room.AdminId)
				.then(async res =>
					await RoomAPI.getClientsInRoom(this.state.roomId).then(
						res2 => {
							this.setState({ room: { ...room, admin: res.data.username, clients: res2.data }})
						}
					)
				)
				.catch(err => {
					throwError(err.response.status, err.response.data.message)
				})
		}
	}
	componentDidMount() {
		this.store.register(this)
		this.update()
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.params.id !== this.props.params.id) {
			this.state.roomId = this.props.params.id
			this.update()
		}
	}

	render() {
		if (!this.state.room) return null

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					gap: '2rem',
				}}
			>
				<div className={css.header}>
					<div className={css.roomId}>
						#{this.state.room.id} -
						{this.state.room.isActivate ? (
							<b style={{ color: 'lime' }}>Active</b>
						) : (
							<b style={{ color: 'red' }}>Inactive</b>
						)}
					</div>
					<div className={css.buttonsWrapper}>
						<button
							className={css.closeButton}
							disabled={!this.state.room.isActivate}
							onClick={this.closeIt}
						>
							Terminate
						</button>
					</div>
				</div>
				<div className={css.topBar}>
					<div className={css.roomGame}>
						{
							this.store.state.games.find(
								game => game.id == this.state.room.GameId
							).name
						}
					</div>
					{this.state.room.isActivate && (
						<div className={css.roomCode}>
							CODE:{' '}
							<b style={{ color: 'white', fontSize: '3rem' }}>
								{this.state.room.code}
							</b>
						</div>
					)}
				</div>
				<div className={css.middleBar}>
					<div className={css.roomInfo}>
						<div className={css.roomInfoText}>
							{this.state.room.admin || 'No admin'}
						</div>
						<div className={css.roomInfoText}>
							{
								this.store.state.myLocations.find(
									l => l.id == this.state.room.LocationId
								).address
							}
						</div>
						<div className={css.roomInfoText}>
							{new Date(this.state.room.createdAt).toLocaleString('ua-UA', {
								year: '2-digit',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</div>
					</div>
				</div>
				<div className={css.footer}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: '10%',
						}}
					>
						<div className={css.title}>
							Players {this.state.room.clients.length}/
							{
								this.store.state.games.find(
									game => game.id == this.state.room.GameId
								).maxPlayers
							}
						</div>
						<PDFDownloadLink
							document={FormularDocument(this.state.room)}
							fileName='formular.pdf'
							style={{
								textDecoration: 'none',
								padding: '8px 12px',
								backgroundColor: 'transparent',
								color: 'var(--color-orange)',
								border: '2px solid var(--color-orange)',
							}}
						>
							{({ loading }) => (loading ? 'Genera...' : 'Download')}
						</PDFDownloadLink>
					</div>

					<div className={css.playersWrapper}>
						<table className={css.playersTable}>
							<thead>
								<tr>
									<th>ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Birthday</th>
									<th>Phone</th>
									<th>Email</th>
									<th style= {{border: 0}}></th>
								</tr>
							</thead>
							<tbody>
								{(() => {
									return this.state.room.clients?.map(client => {

										return (
											<tr>
												<td>{client.id}</td>
												<td>{client.firstName}</td>
												<td>{client.lastName}</td>
												<td>{new Date(client.birthday).toLocaleDateString("ua-UA", {
													day: '2-digit',
													month: "2-digit",
													year: "numeric"
												})}</td>
												<td>{client.phone}</td>
												<td>{client.mail}</td>
												<td><img style={{ width: "25px" }} src={trash} onClick={async()=>{
													RoomAPI.deleteClientFromRoom(this.state.roomId, client.id).then(res=>{
														this.state.room.clients = this.state.room.clients.filter(c=>c.id != client.id)
														this.setState({room: this.state.room})
													}).catch(err=>{
														throwError(err.response.status, err.response.data.message)
													})
												}}></img></td>
											</tr>
										)
									})
								})()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Room)