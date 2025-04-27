import css from 'admin/css/Layout.module.css'
import logo from 'img/logo.png'

import { withRouter } from 'utils/withRouter'
import ComponentWithStore from 'utils/ComponentWithStore'

class Layout extends ComponentWithStore {
	render() {
		return (
			<>
				<div className={css.nav}>
					<img
						onClick={() => this.props.nav('/admin')}
						src={logo}
						alt='Logo'
						style={{ cursor: 'pointer' }}
					/>
					<div style={{ display: 'flex' }}>
						<div className={css.navList}>
							<div onClick={() => this.props.nav('/admin/rooms')}>Rooms</div>
							<div onClick={() => this.props.nav('/admin/clients')}>
								Clients
							</div>
							<div onClick={() => this.props.nav('/admin/bookings')}>
								Bookings
							</div>
						</div>
						{this.store.state.myInfo?.isSuperAdmin && (
							<div className={css.navList}>
								<div onClick={() => this.props.nav('/admin/sa')}>SA Menu</div>
							</div>
						)}
					</div>
					<div className={css.navList}>
						<select
							onChange={e => {
								this.store.setState({ curLocation: e.target.value })
								this.props.nav('/admin/rooms')
							}}
							value={this.store.state.curLocation || ''}
						>
							{this.store.state.myLocations.length === 0 && (
								<option value=''>No Locations</option>
							)}
							{this.store.state.myLocations.length > 0 && (
								<option value='' disabled hidden>Select Location</option>
							)}
							{Array.from(
								new Set(this.store.state.myLocations.map(location => location.city))
							).map((city, index) => {
								return (
									<optgroup
										label={city}
										key={index}
										style={{ textAlign: 'left' }}
									>
										{this.store.state.myLocations
											.filter(location => location.city === city)
											.map(location => {
												return (
													<option key={location.id} value={location.id}>
														{location.address}
													</option>
												)
											})}
									</optgroup>
								)
							})}
						</select>
					</div>
					<div className={css.navList}>
						<div
							onClick={() => {
								localStorage.clear()
								window.location.reload()
							}}
						>
							Logout
						</div>
					</div>
				</div>
				<div className={css.wrapper}>{this.props.children}</div>
			</>
		)
	}
}
export default withRouter(Layout)
