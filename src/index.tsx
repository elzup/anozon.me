import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './containers/App'

import * as serviceWorker from './serviceWorker'
import configureStore from './store'

import { GlobalStyle } from './config/init'

const { store, persistor } = configureStore()

const rootEl = document.getElementById('root')

if (rootEl !== null) {
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<div />} persistor={persistor}>
				<GlobalStyle />
				<App />
			</PersistGate>
		</Provider>,
		rootEl
	)
	serviceWorker.register()
}
