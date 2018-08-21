// @flow
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import AuthContainer from '../AuthContainer'
import Auth from '../AuthContainer/Auth'
import HouseContainer from '../HouseContainer'
import HousePage from '../HouseContainer/HousePage'
import ScenarioPage from '../HouseContainer/ScenarioPage'
import ScrollToTop from './ScrollToTop'
import NavBar from '../NavBarContainer'

const PreComp = (props: any) => <div>{JSON.stringify(props)}</div>

// @HACKME
const RouteApp = () => (
	<Router>
		<Switch>
			<Route exact path="/login" component={AuthContainer} />
			<Auth>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<NavBar />
					<ScrollToTop>
						<Switch>
							<Route exact path="/" component={HouseContainer} />
							<Route exact path="/houses/:id" component={HousePage} />
							<Route
								path="/houses/:hid/scenarios/:sid"
								component={ScenarioPage}
							/>

							<Route exact path="/p/houses" component={PreComp} />
							<Route path="/p/houses/:id" component={PreComp} />
						</Switch>
					</ScrollToTop>
				</div>
			</Auth>
		</Switch>
	</Router>
)
export default RouteApp
