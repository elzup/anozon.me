// @flow
import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

import App from './containers/App'

import registerServiceWorker from './config/registerServiceWorker'
import configureStore from './store'

import './config/init'

const { store, persistor } = configureStore()

const rootEl = document.getElementById('root')

if (rootEl !== null) {
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<h3>Loading</h3>} persistor={persistor}>
				<CssBaseline />
				<MuiThemeProvider theme={theme}>
					<App />
				</MuiThemeProvider>
			</PersistGate>
		</Provider>,
		rootEl,
	)
	registerServiceWorker()
}
