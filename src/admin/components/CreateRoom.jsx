import ComponentWithStore from 'utils/ComponentWithStore'
import css from 'admin/css/CreateRoom.module.css'
import { Room } from 'utils/apiController.ts'

export default class CreateRoom extends ComponentWithStore {
	async createRoom(gameId) {
		const room = await Room.createRoom(this.state.curLocation, gameId)
		this.store.setState({ rooms: [...this.state.rooms, room.data] })
	}

	gameTemplate(game) {
		console.log(game.icon)
		return (
			<div key={game.id} className={css.gameItem} onClick={() => this.createRoom(game.id)}>
				<img
					src={`http://localhost:8000/public/${""+game.icon}`}
					alt={game.name}
					style={{ width: '100%', height: '170px', objectFit: 'cover', objectPosition: 'center' }}
				/>
				<div className={css.gameItemContent}>
					<div
						className={css.gameItemColorMarker}
						style={{ backgroundColor: game.color }}
					></div>
					<div className={css.gameItemName}>{game.name}</div>
					<div className={css.gameItemMaxPlayers}>max {game.maxPlayers} 🤸</div>
				</div>
			</div>
		)
	}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					padding: '1rem',
					height: '100%',
				}}
			>
				<h1>Create Room</h1>
				<h2>Select Game</h2>
				<div className={css.gameList}>
					{this.state.games?.map(game => this.gameTemplate(game))}
				</div>
			</div>
		)
	}
}
