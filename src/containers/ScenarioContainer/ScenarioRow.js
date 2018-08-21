// @flow
import { connect } from 'react-redux'
import type { State, Scenario } from '../../types'
import ScenarioRow from '../../components/ScenarioRow'

import * as logics from '../HouseContainer/logic'

type OProps = {
	scenario: Scenario,
	keyi: number,
}

const ms = (state: State, op: OProps) => ({
	scenario: op.scenario,
	keyi: op.keyi,
	disabled: state.Network.isLoading,
})

const conn = connect(ms, {
	handleSwitch: logics.switchScenario,
})

export default conn(ScenarioRow)
