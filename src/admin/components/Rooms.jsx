import css from 'admin/css/Rooms.module.css'
import Room from './Room'
import CreateRoom from './CreateRoom'
import { Routes, Route } from 'react-router-dom'
import ComponentWithStore from 'utils/ComponentWithStore'

export default class Rooms extends ComponentWithStore {
	roomTemplate(room) {
		const game = this.state.games.find(game => game.id === room.gameId)
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
					<div className={css.roomCode}>
						Code: <b>{room.code}</b>
					</div>
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
					<div className={css.roomPlayers}>
						<b>
							{room.playersIDs.length}/{game.maxPlayers}
						</b>
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
					{room.active ? (
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
					<button className={css.addButton} onClick={()=>this.props.nav("/admin/rooms/create")}>Create Room</button>

					<div
						style={{
							height: '100%',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						<div className={css.title}>Rooms</div>

						<div className={css.rooms}>
							{this.state.rooms
								?.filter(room => room.active)
								.map(room => this.roomTemplate(room))}
							{this.state.rooms
								?.filter(room => !room.active)
								.map(room => this.roomTemplate(room))}
						</div>
					</div>
				</div>
				<div className={css.content}>
					<Routes>
						<Route path='/' />
						<Route path=':id' element={<Room />} />
						<Route path='create' element={<CreateRoom />} />
					</Routes>
				</div>
			</>
		)
	}
}
