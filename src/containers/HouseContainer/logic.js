// @flow
import _ from 'lodash'
import moment from 'moment'
import { triggerToText } from '../../utils'

import type {
	ThunkAction,
	ID,
	House,
	Log,
	Control,
	SubControl,
	Trigger,
	FarmEvent,
	Scenario,
} from '../../types'
import * as actions from './actions'
import * as logActions from '../LogContainer/actions'
import * as networkActions from '../Network/actions'
import * as client from '../../api/client'

import config from '../../config'

export function isHouseActive(house: House): boolean {
	return moment(house.lastLog.createdAt).isAfter(
		moment().subtract(config.activeJudgeSpan),
	)
}

function isHit(pin: number, { activePin, negativePin }: Control): boolean {
	const apinSt = activePin === -1 || ((pin >> activePin) & 1) === 1
	const npinSt = negativePin === -1 || ((pin >> negativePin) & 1) === 0
	return apinSt && npinSt
}

function housesBatch(houses: House[]): House[] {
	return houses.map(house => {
		return {
			...house,
			controls: sortControls(house.controls, house),
			triggers: sortTriggers(house.triggers),
			scenarios: sortScenarios(house.scenarios, house),
			isActive: isHouseActive(house),
		}
	})
}

const normPin = v => (v >= 0 ? `${v + 1}` : null)

function sortControls(controls: Control[], house: House): Control[] {
	return _.sortBy(controls, ['label']).map(v => ({
		...v,
		subControls: sortSubControls(v.subControls),
		activePinView: normPin(v.activePin),
		negativePinView: normPin(v.negativePin),
		isHit: isHit(house.pin, v),
	}))
}

function sortSubControls(subControls: SubControl[]): SubControl[] {
	return _.sortBy(subControls, [e => -e.rate])
}

function sortScenarios(scenarios: Scenario[], house: House): Scenario[] {
	return scenarios.map(s => ({
		...s,
		isActive: `${house.activeScenarioId}` === `${s.id}`,
		events: sortEvents(s.events),
	}))
}

function sortEvents(events: FarmEvent[]): FarmEvent[] {
	return _.sortBy(events, [
		e => {
			const ms = moment(e.startTime)
			const me = moment(e.endTime)
			return `${ms.format('HH:mm')}-${me.format('HH:mm')}`
		},
	])
}

function sortTriggers(triggers: Trigger[]): Trigger[] {
	return _.sortBy(triggers, ['sensor', 'sensorValue', 'rule']).map(v => ({
		...v,
		label: triggerToText(v),
	}))
}

export function loadHouses(): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.getHouses(getState().AuthContainer.accessToken)
		const houses = housesBatch(res)
		await dispatch(actions.registerHouses(houses))
		await dispatch(networkActions.syncEnd())
	}
}

const calcVpd = input => {
	const { tmp, hmd } = input || {}
	if (typeof tmp !== 'number' || typeof hmd !== 'number') {
		throw new TypeError(
			`Expected a { tmp: number, hmd: number }, got ${typeof tmp} ${typeof hmd}`,
		)
	}
	// vaporPressur
	const vp = 6.1078 * Math.pow(10, 7.5 * tmp / (tmp + 237.3))
	const swv = 217 * vp / (tmp + 273.15)
	// amount of saturated water vapor
	const vpd = (100 - hmd) * swv / 100
	return { vp, swv, vpd }
}

export function calcLog(log: Log): Log {
	const { vpd } = calcVpd(log)
	return {
		...log,
		vpd,
	}
}

export function loadLogs(p: { houseId: ID, day: string }): ThunkAction {
	return async (dispatch, getState) => {
		const res = await client.get({
			path: `/houses/${p.houseId}/logs`,
			params: { day: p.day },
			token: getState().AuthContainer.accessToken,
		})
		const logs = _.map(res, calcLog)
		const tempMax = _.maxBy(logs, 'tmp').tmp
		const tempMin = _.minBy(logs, 'tmp').tmp
		await dispatch(
			logActions.receiveLogs(
				{ logs, tempMax, tempMin },
				`${p.houseId}:${p.day}`,
			),
		)
	}
}

export function deleteControl(control: Control): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.deleteControl(
			control.id,
			getState().AuthContainer.accessToken,
		)
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function runControl(control: Control): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client
			.runControl(control.id, getState().AuthContainer.accessToken)
			.catch(e => false)
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function createControl(params: {
	houseId: ID,
	label: string,
	activePin: number,
	negativePin: number,
	timer: number,
}): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.createControl({
			...params,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function submitScenario(scenario: Scenario): ThunkAction {
	if (scenario.isNew) {
		return createScenario(scenario)
	} else {
		return updateScenario(scenario)
	}
}

function createScenario(scenario: Scenario): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.post({
			path: '/scenarios',
			params: {
				scenario: {
					name: scenario.name,
					house_id: scenario.houseId,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

function updateScenario(scenario: Scenario): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.put({
			path: `/scenarios/${scenario.id}`,
			params: {
				scenario: {
					name: scenario.name,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function deleteScenario(scenario: Scenario): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.del({
			path: `/scenarios/${scenario.id}`,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function createTrigger(trigger: Trigger): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())

		const res = await client.post({
			path: '/triggers',
			params: {
				trigger: {
					house_id: trigger.houseId,
					sensor: trigger.sensor,
					high: trigger.high,
					low: trigger.low,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function deleteTrigger(params: { triggerId: ID }): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.deleteTrigger({
			...params,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

function nonZero(v: any) {
	if (!v || v === '0') {
		return null
	}
	return v
}

export function createEvent(event: FarmEvent): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.post({
			path: '/events',
			params: {
				event: {
					scenario_id: event.scenarioId,
					trigger_id: nonZero(event.triggerId),
					sub_control_id: event.subControlId,
					start_time: event.startTime,
					end_time: event.endTime,
					active_interval: event.activeInterval,
					negative_interval: event.negativeInterval,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

// TODO: to SubControlField
export function createSubControl(sc: $Shape<SubControl>): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.post({
			path: '/sub_controls',
			params: {
				sub_control: {
					control_id: sc.controlId,
					name: sc.name,
					rate: sc.rate,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function runSubControl(sc: SubControl): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.put({
			path: `/sub_controls/${sc.id}/run`,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function deleteSubControl(sc: SubControl): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.del({
			path: `/sub_controls/${sc.id}`,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function updateEvent(event: FarmEvent): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.put({
			path: `/events/${event.id}`,
			params: {
				event: {
					scenario_id: event.scenarioId,
					trigger_id: event.triggerId,
					control_id: event.controlId,
					start_time: event.startTime,
					end_time: event.endTime,
					active_interval: event.activeInterval,
					negative_interval: event.negativeInterval,
					enabled: event.enabled,
				},
			},
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function toggleEventEnabled(event: FarmEvent): ThunkAction {
	return async (dispatch, getState) => {
		dispatch(updateEvent({ ...event, enabled: !event.enabled }))
	}
}

export function deleteEvent(params: { eventId: ID }): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.deleteEvent({
			...params,
			token: getState().AuthContainer.accessToken,
		})
		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}

export function switchScenario(scenario: Scenario): ThunkAction {
	return async (dispatch, getState) => {
		await dispatch(networkActions.syncStart())
		const res = await client.put({
			path: `/houses/${scenario.houseId}`,
			params: {
				house: {
					active_scenario_id: scenario.id,
				},
			},
			token: getState().AuthContainer.accessToken,
		})

		console.log(res)
		await dispatch(loadHouses())
		await dispatch(networkActions.syncEnd())
	}
}
