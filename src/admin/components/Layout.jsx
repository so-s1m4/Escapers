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
						<div className={css.navList}>
							<div onClick={() => this.props.nav('/admin/settings')}>
								Settings
							</div>
							<div onClick={() => this.props.nav('/admin/logout')}>Logout</div>
						</div>
					</div>
					<div className={css.navList}>
						<select
							onChange={e => {
								this.store.setState({ curLocation: e.target.value });
							}}
							value={
								this.store.state.curLocation ||
								''
							}
						>
							{this.store.state.myLocations.length === 0 && (
								<option value="">No Locations</option>
							)}
							{this.store.state.myLocations.length > 0 && (
								<option value="">Select Location</option>
							)}
							{this.store.state.myLocations.map(loc => {
								return (
									<option key={loc.id} value={loc.id}>
										{loc.address}
									</option>
								)
							})}
						</select>
					</div>
				</div>
				<div className={css.wrapper}>{this.props.children}</div>
			</>
		)
	}
}
export default withRouter(Layout)
