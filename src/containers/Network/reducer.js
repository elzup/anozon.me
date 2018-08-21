// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {
	isLoading: boolean,
}

export const initialState: State = {
	isLoading: false,
}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.SYNC_START:
			return {
				...state,
				isLoading: true,
			}

		case Actions.SYNC_END:
			return {
				...state,
				isLoading: false,
			}

		default:
			return state
	}
}
