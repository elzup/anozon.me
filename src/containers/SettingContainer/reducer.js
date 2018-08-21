// @flow
import type { Action, AppConfig } from '../../types'
import { Actions } from './actionTypes'

export type State = AppConfig

export const initialState: State = {
	editScenario: false,
	editControl: false,
	editTrigger: false,
	editEvent: false,
}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.UPDATE_CONFIG:
			return action.config
		default:
			return state
	}
}
