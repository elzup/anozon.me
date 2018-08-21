// @flow
import { withRouter, type RouterHistory, type Match } from 'react-router-dom'
import { connect } from 'react-redux'
import * as React from 'react'

import type { State, ID, DayLogById } from '../../types'
import { makeDayLabel } from '../../utils'
import LogGraph, { type Props as CProps } from '../../components/LogGraph'
import * as logics from '../HouseContainer/logic'
import * as selectors from './selectors'

type OProps = {
	history: RouterHistory,
	match: Match,
}

type Props = CProps & {
	history: RouterHistory,
	dayLogs: DayLogById,
	houseId: ID,
	loadLogs: Function,
}

class Container extends React.Component<Props> {
	componentDidMount() {
		this.props.loadLogs({ houseId: this.props.houseId, day: this.props.day })
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.day !== nextProps.day) {
			this.props.loadLogs({ houseId: this.props.houseId, day: nextProps.day })
		}
	}

	render() {
		const { props } = this
		return (
			<LogGraph
				dayLogs={props.dayLogs}
				day={props.day}
				isToday={props.isToday}
				houseId={props.houseId}
				handleSubmit={({ day }: { day: string }) => {
					props.history.push({ search: `?day=${day}` })
				}}
				handleSubmitToday={() => {
					props.history.push({ search: `` })
				}}
			/>
		)
	}
}

const ms = (state: State, op: OProps) => {
	const houseId = op.match.params.id || '0'
	const params = new URLSearchParams(op.history.location.search)
	const day = makeDayLabel(params.get('day') || undefined)
	return {
		houseId,
		dayLogs: selectors.getLogs(state, `${houseId}:${day}`),
		history: op.history,
		isToday: makeDayLabel() === day,
		day,
	}
}

const conn = connect(ms, {
	loadLogs: logics.loadLogs,
})

export default withRouter(conn(Container))
