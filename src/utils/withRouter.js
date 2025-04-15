import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function withRouter(Component) {
	return function ComponentWithRouterProp(props) {
		const params = useParams()
		const nav = useNavigate()
		return <Component {...props} params={params} nav = {nav} />
	}
}
