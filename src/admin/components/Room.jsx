import ComponentWithStore from 'utils/ComponentWithStore'
import { Admin, Room as RoomAPI } from 'utils/apiController.ts'
import { withRouter } from 'utils/withRouter'
import css from 'admin/css/Room.module.css'

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
	update() {
		this.state.room = this.store.state.rooms?.find(
			room => room.id == this.state.roomId
		)
		this.setState({ room: this.state.room })
	}
	componentDidMount() {
		this.store.register(this)
		setTimeout(() => {
			this.update()
		}, 300)
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.params.id !== this.props.params.id) {
			this.state.roomId = this.props.params.id
			this.state.room = this.store.state.rooms.find(
				room => room.id == this.state.roomId
			)
			this.state.room.admin = await Admin.getAdmin(
				this.state.room.AdminId
			).then(res => res.data.username)
			this.setState({ room: this.state.room })
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
							className={css.addButton}
							disabled={!this.state.room.isActivate}
						>
							Add Player
						</button>
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
							Players 0/
							{
								this.store.state.games.find(
									game => game.id == this.state.room.GameId
								).maxPlayers
							}
						</div>
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
									<th colSpan={3}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{(() => {
									return this.state.room.playersIDs?.map(playerId => {
										const client = this.store.state.clients.find(
											client => client.id == playerId
										)

										return (
											<tr>
												<td>{client.id}</td>
												<td>{client.firstName}</td>
												<td>{client.lastName}</td>
												<td>{client.birthday}</td>
												<td>{client.phone}</td>
												<td>{client.email} </td>
												<td></td>
												<td></td>
												<td></td>
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
