// @flow
import type { Action, DayLogById } from '../../types'
import { Actions } from './actionTypes'

export type State = { [id: string]: DayLogById }

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.RECEIVE_LOGS:
			return { ...state, [action.label]: action.day }

		default:
			return state
	}
}
