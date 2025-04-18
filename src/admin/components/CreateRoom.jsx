import ComponentWithStore from "utils/ComponentWithStore";
export default class CreateRoom extends ComponentWithStore {

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <h1>Create Room</h1>
        <label htmlFor="roomName">Room Name</label>
        <input type="text" id="roomName" placeholder="Room Name" />
        <label htmlFor="gameSelect">Select Game</label>
        <select id="gameSelect">
          <option value="">Select Game</option>
          {this.state.games?.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
        <button onClick={() => this.createRoom()}>Create Room</button>
      </div>
    );
  }
}