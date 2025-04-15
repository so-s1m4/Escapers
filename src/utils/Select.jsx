import css from './css/Select.module.css'
import React from 'react'

export class Select extends React.Component {
	constructor(props) {
		super()
		this.state = {
			open: false,
			selected: props.value,
		}
		this.children = props.children
	}

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ selected: this.props.value })
    }
  }

	onClick = value => {
		this.setState({ selected: value, open: false })
    this.props.onChange(value)
	}
	render() {
		if (!this.children) return null
		return (
			<div
				className={css.select}
				onClick={() => this.setState({ open: !this.state.open })}
			>
				<div className={css.selectIcon}>\/</div>
				<div className={css.selected}>
					{
						this.children.find(
							child => child.props.value == this.state.selected
						).props.children
					}
				</div>
				<div
					className={css.options}
					style={{ display: this.state.open ? 'flex' : 'none' }}
				>
					{this.props.children.map(child => {
            return React.cloneElement(child, {
              onClick: this.onClick,
              key: child.props.value,
            })
          })}
				</div>
			</div>
		)
	}
}
export class Option extends React.Component {
	constructor(props) {
		super()
		this.value = props.value
		this.name = props.children
	}
	render() {
		return (
			<div
				className={css.option}
				onClick={() => this.props.onClick(this.props.value)}
			>
				{this.props.children}
			</div>
		)
	}
}
