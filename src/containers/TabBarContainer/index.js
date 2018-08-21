// @flow
import { connect } from 'react-redux'
import type { State } from '../../types'
import TabBar from '../../components/TabBar'
import { withRouter } from 'react-router-dom'

// import * as selectors from './selectors'

type OProps = {
	history: {
		push: Function,
	},
	location: {
		pathname: string,
	},
}

function normalizePathSelection(path: string) {
	if (path.indexOf('/ep/') !== -1) {
		return '/'
	}
	return path
}

const ms = (state: State, op: OProps) => {
	const { history, location: { pathname } } = op
	// @HACKME
	const value = normalizePathSelection(pathname)
	return {
		onPush: history.push,
		value,
	}
}

const conn = connect(ms, {})

export default withRouter(conn(TabBar))
