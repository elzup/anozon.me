// @flow
import type { Action, System } from '../../types'
import { Actions } from './actionTypes'

export type State = System

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.UPDATE_SYSTEM:
			return {
				...state,
				...action.system,
			}

		default:
			return state
	}
}
