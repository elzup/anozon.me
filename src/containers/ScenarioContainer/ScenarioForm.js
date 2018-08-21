// @flow
import { connect } from 'react-redux'
import type { State, Scenario } from '../../types'
import ScenarioForm from '../../components/ScenarioForm'

import * as logics from '../HouseContainer/logic'

type OProps = {
	scenario: Scenario,
}
const ms = (state: State, op: OProps) => ({
	scenario: op.scenario,
	disabled: state.Network.isLoading,
})

const conn = connect(ms, {
	handleSubmit: logics.submitScenario,
	handleDelete: logics.deleteScenario,
})

export default conn(ScenarioForm)
