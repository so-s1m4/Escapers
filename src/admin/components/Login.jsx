import img from "img/logo.png"
import img2 from "img/gifka.webp"
import css from 'admin/css/Login.module.css'
import { Admin } from 'utils/apiController.ts'
import throwError from "utils/throwError.ts"

export default function Login() {
	const handleSubmit = async e => {
		e.preventDefault()
		const form = e.target
		const username = form.username.value
		const password = form.password.value

		await Admin.login({username, password})
			.then(res => {
				if (res.success) {
					localStorage.setItem('token', res.token)
					window.location.reload()
				} else {
				}
			})
			.catch(err => {
				throwError(err.status, err.response?.data.message || err.message)
			})
	}
	return (
		<>
			<div className={css.wrapper}>

				<div className={css.sideBar}>
          <img src={img} alt="Logo" />
					<form onSubmit={handleSubmit}>
						<h2>Admin Panel</h2>
						<input
							type='text'
							placeholder='Username'
							name='username'
							required
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							required
						/>
						<button type='submit'>Login</button>
					</form>
				</div>
        <img src={img2} alt = "prikooolchik"/>
			</div>
		</>
	)
}
