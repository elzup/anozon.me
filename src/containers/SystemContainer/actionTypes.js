// @flow
import type { System } from '../../types'

export const UPDATE_SYSTEM: 'SystemContainer/UPDATE_SYSTEM' =
	'SystemContainer/UPDATE_SYSTEM'

export const Actions = {
	UPDATE_SYSTEM,
}

export type UpdateSystem = {
	type: typeof UPDATE_SYSTEM,
	system: $Shape<System>,
}

export type Action = UpdateSystem
