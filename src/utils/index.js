// @flow

import type { ID, Sensor, Trigger } from '../types'
import moment from 'moment'

export function sleep(msec: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, msec))
}

export const annict = {
	recordUrl: (username: string, recordId: ID) =>
		`https://jp.annict.com/@${username}/records/${recordId}`,
}

export const sensorLib: { [n: number | string]: Sensor } = {
	'1': {
		id: 1,
		label: '気温',
		unit: '度',
	},
	'2': {
		id: 2,
		label: '湿度',
		unit: '%',
	},
	'3': {
		id: 3,
		label: 'CO2',
		unit: 'ppm',
	},
	'4': {
		id: 4,
		label: '気圧',
		unit: 'hPa',
	},
}

export function makeDayLabel(daystring?: string): string {
	return moment(daystring).format('YYYY-MM-DD')
}

export function triggerToText(trigger: Trigger): string {
	const { label, unit } = sensorLib[trigger.sensor]
	const { low, high } = trigger
	if (low && high) {
		return `${low}${unit} <= ${label} <= ${high}${unit}`
	} else if (low) {
		return `${low}${unit} <= ${label}`
	} else if (high) {
		return `${label} <= ${high}${unit}`
	}
	return ``
}
