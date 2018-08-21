// @flow
import { SYNC_START, SYNC_END } from './actionTypes'
import type { SyncStart, SyncEnd } from './actionTypes'

export function syncStart(): SyncStart {
	return {
		type: SYNC_START,
	}
}
export function syncEnd(): SyncEnd {
	return {
		type: SYNC_END,
	}
}
