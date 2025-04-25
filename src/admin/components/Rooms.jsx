import css from 'admin/css/Rooms.module.css'
import Room from './Room'
import CreateRoom from './CreateRoom'
import { Routes, Route } from 'react-router-dom'
import ComponentWithStore from 'utils/ComponentWithStore'
import { withRouter } from 'utils/withRouter'
import historyIcon from 'img/history.svg'

class Rooms extends ComponentWithStore {
	constructor(props) {
		super(props)
		this.state = {
			showHistory: false,
		}
	}

	componentDidMount() {
		this.store.register(this)

		if (window.location.pathname == '/admin/rooms/history') {
			this.setState({ showHistory: true })
		}
	}

	roomTemplate(room) {
		const game = this.state.games?.find(g => g.id == room.GameId)
		if (!game) return null

		return (
			<div
				onClick={() => this.props.nav('/admin/rooms/' + room.id)}
				key={room.id}
				className={css.room}
				style={{
					color: game.color,

					backgroundColor: 'rgba(255, 255, 255, 0.05)',

					display: 'flex',
					flexDirection: 'column',
					padding: '.5rem 1rem',
					gap: '.5rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div className={css.roomID}>
						<b>#{room.id}</b>
					</div>
					{room.isActivate && (
						<div className={css.roomCode}>
							Code: <b>{room.code}</b>
						</div>
					)}
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div className={css.roomGame}>
						<b>{game.name}</b>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div className={css.roomCreatedAt}>
						{new Date(room.createdAt).toLocaleDateString('ua-UA', {
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						})}
					</div>
					{room.isActivate ? (
						<b style={{ color: 'lime' }}>Active</b>
					) : (
						<b style={{ color: 'red' }}>Inactive</b>
					)}
				</div>
			</div>
		)
	}
	render() {
		return (
			<>
				<div className={css.nav}>
					<div
						style={{
							height: '100%',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						<div className={css.title}>
							Rooms{' '}
							<img
								onClick={() => {
									this.setState({ showHistory: !this.state.showHistory })
								}}
								className={css.historyBtn}
								src={historyIcon}
							/>
						</div>

						<button
							className={css.addButton}
							onClick={() => this.props.nav('/admin/rooms/create')}
						>
							Create Room
						</button>

						<div className={css.rooms}>
							{this.store.state.rooms
								?.filter(room => {
									return this.state.showHistory || room.isActivate
								})
								.sort((a, b) => {
									return b.id - a.id
								})
								.map(room => this.roomTemplate(room))}
						</div>
					</div>
				</div>
				<div className={css.content}>
					<Routes>
						<Route path=':id' element={<Room />} />
						<Route path='create' element={<CreateRoom />} />
					</Routes>
				</div>
			</>
		)
	}
}

export default withRouter(Rooms)
