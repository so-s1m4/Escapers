import { withRouter } from 'utils/withRouter'
import ComponentWithStore from 'utils/ComponentWithStore'

import css from './SuperAdmin.module.css'
import { Route, Routes } from 'react-router-dom'
import { Admin } from 'utils/apiController.ts'
import { useEffect, useState } from 'react'

function Admins() {
  const [admins, setAdmins] = useState([])
  
  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await Admin.getAdmins()
      if (!response.success) {
        console.error('Failed to fetch admins')
        return
      }
      setAdmins(response.data)
    }
    
    fetchAdmins()
  }, [])
  
  return (
		<>
			<button className={css.createBtn}>Create</button>
			<table className={css.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Locations</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{admins.map(admin => {
						return (
							<tr className={css.tableRow} key={admin.id}>
								<td>{admin.id}</td>
								<td>{admin.username}</td>
								<td>{admin.firstName}</td>
								<td>{admin.lastName}</td>
								<td>{}</td>
								<td>
									<button onClick={() => {}}>Edit</button>
									<button onClick={() => {}}>Delete</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
function Games() {
	return <div>Games</div>
}
function Locations() {
	return <div>Locations</div>
}


class SuperAdmin extends ComponentWithStore {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.store.register(this)
	}
	componentDidUpdate() {
		if (!this.store.state.myInfo.isSuperAdmin) {
			this.props.nav('/admin')
		}
	}
	render() {
		return (
			<div className={css.container}>
				<div className={css.nav}>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/admins')}
					>
						Admins
					</div>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/games')}
					>
						Games
					</div>
					<div
						className={css.navItem}
						onClick={() => this.props.nav('/admin/sa/locations')}
					>
						Locations
					</div>
				</div>
        <div className={css.content}>
          <Routes>
            <Route path="/admins" element={<Admins />} />
            <Route path="/games" element={<Games />} />
            <Route path="/locations" element={<Locations />} />
          </Routes>
        </div>
			</div>
		)
	}
}

export default withRouter(SuperAdmin)
