// @flow
export const SYNC_START: 'Network/SYNC_START' = 'Network/SYNC_START'
export const SYNC_END: 'Network/SYNC_END' = 'Network/SYNC_END'

export const Actions = {
	SYNC_START,
	SYNC_END,
}

export type SyncStart = {
	type: typeof SYNC_START,
}

export type SyncEnd = {
	type: typeof SYNC_END,
}

export type Action = SyncStart | SyncEnd
