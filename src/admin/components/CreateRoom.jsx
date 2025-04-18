import ComponentWithStore from "utils/ComponentWithStore";
import css from "admin/css/CreateRoom.module.css";

export default class CreateRoom extends ComponentWithStore {


  createRoom(game){

  }

  gameTemplate(game) {
    return (
			<div key={game.id} className={css.gameItem}>
				<img
					src='http://192.168.31.135:8000/public/default.jpg'
					alt={game.name}
					style={{ width: '100%', height: 'auto' }}
				/>
				<div className={css.gameItemContent}>
					<div className={css.gameItemColorMarker} style = {{backgroundColor: game.color}}></div>
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