// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import TriggerList from '../../components/TriggerList'
import EventList from '../../components/EventList'
import CreateTriggerForm from '../../components/CreateTriggerForm'
import CreateEventForm from '../../components/CreateEventForm'

import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import type { State, House, Scenario, ID, FarmEventFull } from '../../types'
import * as selectors from './selectors'
import * as logics from './logic'

type OProps = {
	match: {
		params: {
			hid: ID,
			sid: ID,
		},
	},
}
type Props = {
	isLoading: boolean,
	house: House,
	scenario: Scenario | null,
	farmEvents: FarmEventFull[],
	loadHouses: Function,
	createEvent: Function,
	deleteEvent: Function,
	createTrigger: Function,
	deleteTrigger: Function,
	toggleEventEnabled: Function,
}

class Container extends React.Component<Props> {
	componentDidMount() {
		this.props.loadHouses()
	}

	render() {
		const { props } = this
		const { scenario } = props
		if (!scenario) {
			return (
				<div>
					<Typography variant="display1" style={{ flex: 1 }}>
						シナリオは削除されたか存在しません
					</Typography>
					<Button
						component={p => (
							<Link
								data-test={`back-house-link`}
								to={`/houses/${props.house.id}`}
								{...p}
							/>
						)}
					>
						←{props.house.name}
					</Button>
				</div>
			)
		}
		return (
			<div>
				<Grid container spacing={24} justify={'center'}>
					<Grid item xs={12} sm={10}>
						<div style={{ display: 'flex' }}>
							<Typography variant="display1" style={{ flex: 1 }}>
								シナリオ: {scenario.name}
							</Typography>
						</div>
						<Button
							component={p => (
								<Link
									to={`/houses/${props.house.id}`}
									{...p}
									data-test={`back-house-link`}
								/>
							)}
						>
							←{props.house.name}
						</Button>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<Typography variant="title">イベント一覧</Typography>
							<EventList
								disabled={props.isLoading}
								farmEvents={props.farmEvents}
								handleDelete={props.deleteEvent}
								handleToggleEnabled={props.toggleEventEnabled}
							/>
							<CreateEventForm
								disabled={props.isLoading}
								house={props.house}
								scenarioId={scenario.id}
								handleSubmit={props.createEvent}
							/>
						</Paper>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<Typography variant="title">トリガー一覧</Typography>
							<TriggerList
								disabled={props.isLoading}
								triggers={props.house.triggers}
								handleDelete={props.deleteTrigger}
							/>
							<CreateTriggerForm
								houseId={props.house.id}
								disabled={props.isLoading}
								handleSubmit={props.createTrigger}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		)
	}
}

const ms = (state: State, op: OProps) => {
	const { hid, sid } = op.match.params
	const house = selectors.getHouse(state, hid)
	const scenario = selectors.getScenario(state, hid, sid)
	const farmEvents = selectors.getFarmEvents(state, hid, sid)
	return { house, scenario, farmEvents, isLoading: state.Network.isLoading }
}

const conn = connect(ms, {
	loadHouses: logics.loadHouses,
	createTrigger: logics.createTrigger,
	deleteTrigger: logics.deleteTrigger,
	createEvent: logics.createEvent,
	deleteEvent: logics.deleteEvent,
	toggleEventEnabled: logics.toggleEventEnabled,
})

export default conn(Container)
