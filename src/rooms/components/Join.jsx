import { withRouter } from 'utils/withRouter'
import React from 'react'

import css from 'rooms/css/Join.module.css'
import ComponentWithStore from 'utils/ComponentWithStore'
class Join extends ComponentWithStore {
	constructor(props) {
		super(props)
		this.state = {
			code: [null, null, null, null],
		}
	}

	focusNextInput = index => {
		const nextInput = document.getElementById(index)
		if (nextInput) {
			nextInput.focus()
		}
	}

	changeValue(e, index) {
		if (e.key == 'Backspace') {
			this.state.code[index] = null
			this.setState({ code: this.state.code })
			return
		}
		if (e.key * 1 > 0 && e.key * 1 < 10) {
			this.state.code[index] = parseInt(e.key)
			this.setState({ code: this.state.code })
			this.focusNextInput(index + 1)
		}
		if (e.key == 0) {
			this.state.code[index] = 0
			this.setState({ code: this.state.code })
			this.focusNextInput(index + 1)
		}

		if (!this.state.code.includes(null) && index == 3) {
			const roomCode = this.state.code.join('')
			const room = this.store.state.rooms.find(room => room.code == roomCode)
			if (room && room.active) {
				this.props.nav(`/rooms/join/${this.state.code.join('')}`)
			}
		}
	}

	render() {
		return (
			<div className={css.container}>
				<div className={css.title}>Join</div>
				<div className={css.codeInput}>
					<input
						type='number'
						maxLength={1}
						min={0}
						max={9}
						id={0}
						className={css.input}
						value={this.state.code[0]}
						onKeyUp={e => this.changeValue(e, 0)}
					/>
					<input
						type='number'
						min={0}
						max={9}
						id={1}
						className={css.input}
						value={this.state.code[1]}
						onKeyUp={e => this.changeValue(e, 1)}
					/>
					<input
						type='number'
						min={0}
						max={9}
						id={2}
						className={css.input}
						value={this.state.code[2]}
						onKeyUp={e => this.changeValue(e, 2)}
					/>
					<input
						type='number'
						min={0}
						max={9}
						id={3}
						className={css.input}
						value={this.state.code[3]}
						onKeyUp={e => this.changeValue(e, 3)}
					/>
				</div>
			</div>
		)
	}
}

export default withRouter(Join)
