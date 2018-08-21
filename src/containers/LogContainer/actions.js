// @flow
import type { DayLogById } from '../../types'

import { RECEIVE_LOGS } from './actionTypes'
import type { ReceiveLogs } from './actionTypes'

export function receiveLogs(day: DayLogById, label: string): ReceiveLogs {
	return {
		type: RECEIVE_LOGS,
		day,
		label,
	}
}
