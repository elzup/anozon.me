import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

type Props = {
	doLogout: () => void,
	handleReport: Function,
}

function SimpleAppBar(props: Props) {
	return (
		<div>
			<AppBar position="static" color="primary">
				<Toolbar color="inherit">
					<Typography variant="title" color="inherit" style={{ flex: 1 }}>
						FarmController
					</Typography>
					<Button
						onClick={() => {
							props.handleReport()
						}}
					>
						レポート
					</Button>
					<Button
						onClick={() => {
							props.doLogout()
						}}
					>
						ログアウト
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default SimpleAppBar
