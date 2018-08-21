// @flow

import camelCaseRecursive from 'camelcase-keys-recursive'
import request from 'superagent'

import config from '../config'
import type { House, Log, AuthResponse, ID } from '../types'

export async function postLogin(params: {
	email: string,
	password: string,
}): Promise<AuthResponse> {
	const res = await request.post(config.api.url + '/login', params)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error(body.error)
	}
	return body
}

// @HACKME
export async function getHouses(token: string): Promise<House[]> {
	const res = await request
		.get(config.api.url + '/houses')
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

type Req = {
	path: string,
	params?: Object,
	token?: string,
}

export async function get({
	path = '/',
	params = {},
	token,
}: Req): Promise<any> {
	const res = await request
		.get(config.api.url + path)
		.query(params)
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function post({
	path = '/',
	params = {},
	token,
}: Req): Promise<any> {
	const res = await request
		.post(config.api.url + path)
		.send(params)
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function put({
	path = '/',
	params = {},
	token,
}: Req): Promise<any> {
	const res = await request
		.put(config.api.url + path)
		.send(params)
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function del({
	path = '/',
	params = {},
	token,
}: Req): Promise<any> {
	const res = await request
		.del(config.api.url + path)
		.send(params)
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function getLogs({
	houseId,
	token,
	day,
}: {
	houseId: ID,
	day: string,
	token: string,
}): Promise<Log[]> {
	const res = await request
		.get(config.api.url + `/houses/${houseId}/logs`)
		.query({ day })
		.set('Authorization', token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

export async function deleteControl(controlId: ID, token: string): Promise<*> {
	const res = await request
		.del(config.api.url + `/controls/${controlId}`)
		.set('Authorization', token)
	if (!res || res.error) {
		throw new Error('invalid token')
	}
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function runControl(controlId: ID, token: string): Promise<*> {
	const res = await request
		.put(config.api.url + `/controls/${controlId}/run`)
		.set('Authorization', token)
	if (!res || res.error) {
		throw new Error('invalid token')
	}
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

function normalizePinIndex(n: number | null): number | null {
	if (n === null) {
		return null
	}
	return n - 1
}

export async function createControl(params: {
	houseId: ID,
	label: string,
	activePin: number,
	negativePin: number,
	token: string,
	timer: number,
}): Promise<*> {
	const res = await request
		.post(config.api.url + `/controls`)
		.send({
			control: {
				label: params.label,
				active_pin: normalizePinIndex(params.activePin),
				negative_pin: normalizePinIndex(params.negativePin),
				house_id: params.houseId,
				timer: params.timer,
			},
		})
		.set('Authorization', params.token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

export async function createScenario(params: {
	houseId: ID,
	name: string,
	token: string,
}): Promise<*> {
	const res = await request
		.post(config.api.url + `/scenarios`)
		.send({
			scenario: {
				name: params.name,
				house_id: params.houseId,
			},
		})
		.set('Authorization', params.token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

export async function createTrigger(params: {
	houseId: ID,
	sensor: number,
	sensorValue: number,
	rule: string,
	token: string,
}): Promise<*> {
	const res = await request
		.post(config.api.url + `/triggers`)
		.send({
			trigger: {
				house_id: params.houseId,
				sensor: params.sensor,
				sensor_value: params.sensorValue,
				rule: params.rule,
			},
		})
		.set('Authorization', params.token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

export async function deleteTrigger(params: {
	triggerId: ID,
	token: string,
}): Promise<*> {
	const res = await request
		.del(config.api.url + `/triggers/${params.triggerId}`)
		.set('Authorization', params.token)
	if (!res || res.error) {
		throw new Error('invalid token')
	}
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function createEvent(params: {
	scenarioId: ID,
	triggerId: ID,
	controlId: ID,
	token: string,
	startTime: string,
	endTime: string,
}): Promise<*> {
	const res = await request
		.post(config.api.url + `/events`)
		.send({
			event: {
				scenario_id: params.scenarioId,
				trigger_id: params.triggerId,
				control_id: params.controlId,
				start_time: params.startTime,
				end_time: params.endTime,
			},
		})
		.set('Authorization', params.token)
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	if (body.error) {
		throw new Error('invalid token')
	}
	return body
}

export async function deleteEvent(params: {
	eventId: ID,
	token: string,
}): Promise<*> {
	const res = await request
		.del(config.api.url + `/events/${params.eventId}`)
		.set('Authorization', params.token)
	if (!res || res.error) {
		throw new Error('invalid token')
	}
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}

export async function switchScenario(params: {
	houseId: ID,
	scenarioId: ID,
	token: string,
}): Promise<*> {
	const res = await request
		.put(config.api.url + `/houses/${params.houseId}/switch`)
		.send({
			house: {
				active_scenario_id: params.scenarioId,
			},
		})
		.set('Authorization', params.token)
	if (!res || res.error) {
		throw new Error('invalid token')
	}
	const body = camelCaseRecursive(res.body, {
		deep: true,
	})
	return body
}
