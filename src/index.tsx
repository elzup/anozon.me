import * as React from 'react'

import TopPage from './containers/TopPage'
import { register } from './serviceWorker'
import { GlobalStyle } from './config/init'

register()

const Main = () => (
	<>
		<GlobalStyle />
		<TopPage />
	</>
)

export default Main
