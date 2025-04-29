import { withRouter } from 'utils/withRouter'
import React from 'react'

import css from 'rooms/css/Join.module.css'
import ComponentWithStore from 'utils/ComponentWithStore'
import { Room } from 'utils/apiController.ts'

class Join extends ComponentWithStore {
	constructor(props) {
		super(props)
		this.state = {
			code: ["", "", "", ""],
		}
		this.checkRoomCode.bind(this)
	}

	focusNextInput = index => {
		const nextInput = document.getElementById(index)
		if (nextInput) {
			nextInput.focus()
		}
	}

	async checkRoomCode() {
		const roomCode = this.state.code.join('')
		await Room.isRoomOpen(roomCode)
			.then(res => {
				console.log(res.success)
				if (res.success) {
					localStorage.setItem('roomCode', roomCode)
					this.props.nav('/rooms/join/' + res.id)
				}
			})
			.catch(err => {})
	}
	changeValue(e, index) {
		if (e.key == 'Backspace') {
			if (this.state.code[index] == "") this.changeValue(e, Math.max(index - 1, 0))
			this.state.code[index] = ""
			this.setState({ code: this.state.code })
			this.focusNextInput(Math.max(index - 1, 0))
		} else {
			if (e.key == 0) {
				this.state.code[index] = 0
				this.setState({ code: this.state.code })
				this.focusNextInput(Math.min(index + 1, 3))
			} else {
				if (e.key * 1 > 0 && e.key * 1 < 10) {
					this.state.code[index] = parseInt(e.key)
					this.state.code[index] = parseInt('' + this.state.code[index])
					this.setState({ code: this.state.code })
					this.focusNextInput(Math.min(index + 1, 3))
				}
			}
		}
		if (!this.state.code.includes("")) {
			this.checkRoomCode()
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
