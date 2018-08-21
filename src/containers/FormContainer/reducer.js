// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {}

export const initialState: State = {
	control: {
		// edit:
	},
}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.OPEN_EDIT_CONTROL:
			return {
				...state,
			}

		case Actions.CLOSE_EDIT_CONTROL:
			return {
				...state,
			}

		default:
			return state
	}
}
