import { Component } from 'react'
import { store } from './Storage'

class ComponentWithStore extends Component {
	constructor(props) {
		super(props)
		this.store = store
		this.state = this.store.getState()
		this.loadInfo = this.loadInfo.bind(this)
	}

	loadInfo() {
		this.setState(this.store.getState())
	}

	componentDidMount() {
		this.store.register(this)
		this.loadInfo()
	}

	componentWillUnmount() {
		this.store.unregister(this)
	}
}

export default ComponentWithStore
