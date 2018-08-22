// @flow
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import TopPage from '../TopPage'

const RouteApp = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={TopPage} />
		</Switch>
	</Router>
)

export default RouteApp
