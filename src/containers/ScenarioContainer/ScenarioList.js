// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { ID, State, Scenario } from '../../types'
import Typography from '@material-ui/core/Typography'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ScenarioForm from './ScenarioForm'
import ScenarioRow from './ScenarioRow'
import EditModeButton from '../../components/EditModeButton'

import * as selectors from '../HouseContainer/selectors'
import * as configLogics from '../SettingContainer/logic'

type OProps = {
	houseId: ID,
}
type Props = {
	houseId: ID,
	scenarios: Scenario[],
	editMode: boolean,
	toggleEditScenario: typeof configLogics.toggleEditScenario,
}

class Container extends React.Component<Props> {
	render() {
		const { props } = this
		const newScenario: Scenario = {
			id: 0,
			houseId: props.houseId,
			name: '',
			isActive: false,
			events: [],
			createdAt: '',
			isNew: true,
		}
		return (
			<React.Fragment>
				<div style={{ display: 'flex' }}>
					<Typography variant="title" style={{ flex: 1 }}>
						シナリオ一覧
					</Typography>
					<EditModeButton
						handleClick={props.toggleEditScenario}
						editMode={props.editMode}
					/>
				</div>
				{props.scenarios.length === 0 ? (
					<Typography variant="subheading">シナリオがありません</Typography>
				) : (
					<List>
						{props.scenarios.map(
							(scenario, i) =>
								props.editMode ? (
									<ListItem key={i}>
										<ScenarioForm scenario={scenario} />
									</ListItem>
								) : (
									<ScenarioRow scenario={scenario} key={i} keyi={i} />
								),
						)}
					</List>
				)}
				{props.editMode && <ScenarioForm scenario={newScenario} />}
			</React.Fragment>
		)
	}
}

const ms = (state: State, op: OProps) => ({
	houseId: op.houseId,
	scenarios: selectors.getHouse(state, op.houseId).scenarios,
	editMode: state.SettingContainer.editScenario,
})

const conn = connect(ms, {
	toggleEditScenario: configLogics.toggleEditScenario,
})

export default conn(Container)
