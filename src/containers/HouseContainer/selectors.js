// @flow
import _ from 'lodash'

import type {
	State,
	House,
	Scenario,
	Control,
	ID,
	FarmEventFull,
	Trigger,
	SubControl,
} from '../../types'

export function getHouses(state: State): House[] {
	return state.HouseContainer.map(v => state.HouseById[v])
}

export function getHouse(state: State, houseId: ID): House {
	return state.HouseById[houseId]
}

export function getControls(state: State, houseId: ID): Control[] {
	const house = getHouse(state, houseId)
	return house.controls
}

export function getScenario(
	state: State,
	houseId: ID,
	scenarioId: ID,
): Scenario {
	const house = getHouse(state, houseId)
	return _.filter(house.scenarios, v => `${v.id}` === scenarioId)[0]
}

export function getFarmEvents(
	state: State,
	houseId: ID,
	scenarioId: ID,
): FarmEventFull[] {
	const house = getHouse(state, houseId)
	const scenario = getScenario(state, houseId, scenarioId)
	if (!scenario) {
		return []
	}
	const triggerById: { [id: ID]: Trigger } = house.triggers.reduce(
		(p, c) => ({ ...p, [c.id]: c }),
		{},
	)
	const subControlById: { [id: ID]: SubControl } = _.flatten(
		house.controls.map(v => v.subControls),
	).reduce((p, c) => ({ ...p, [c.id]: c }), {})

	const farmEvents = scenario.events.map(fe => ({
		...fe,
		...(fe.triggerId ? { trigger: triggerById[fe.triggerId] } : {}),
		subControl: subControlById[fe.subControlId],
	}))
	return farmEvents
}

export function getReport(state: State): string {
	return JSON.stringify(state)
}
