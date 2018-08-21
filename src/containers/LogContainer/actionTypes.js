// @flow
import type { DayLogById } from '../../types'

export const RECEIVE_LOGS: 'LogContainer/RECEIVE_LOGS' =
	'LogContainer/RECEIVE_LOGS'

export const Actions = {
	RECEIVE_LOGS,
}

export type ReceiveLogs = {
	type: typeof RECEIVE_LOGS,
	day: DayLogById,
	label: string,
}

export type Action = ReceiveLogs
