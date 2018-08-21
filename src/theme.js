// @flow

import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
// import lime from '@material-ui/core/colors/lime'

const theme = createMuiTheme({
	palette: {
		primary: { ...green, main: '#43A047' },
		// secondary: lime,
	},
	typography: {
		display1: {
			padding: '20px',
		},
		title: {
			padding: '10px',
		},
	},
	paper: {
		padding: '10px',
	},
	tableCell: {
		textAlign: 'center',
	},
	overrides: {
		MuiGrid: {
			container: {
				marginBottom: '30px',
			},
		},
		MuiPaper: {
			root: {
				marginTop: '20px',
				padding: '5px',
			},
		},
		MuiAppBar: {
			root: {
				padding: 0,
				margin: 0,
			},
		},
		MuiChip: {
			root: {
				marginLeft: '10px',
				height: '28px',
			},
			avatar: {
				height: '28px',
				width: '28px',
			},
		},
		MuiButton: {
			root: {
				minWidth: '60px',
			},
		},
		MuiSvgIcon: {
			root: {
				width: '0.8em',
				height: '0.8em',
			},
		},
		MuiListItem: {
			default: {
				paddingTop: '3px',
				paddingBottom: '3px',
			},
		},
	},
})
export default theme
