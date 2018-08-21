// @flow
import type { Action, ID } from '../../types'
import { Actions } from './actionTypes'

export type State = ID[]

export const initialState: State = []

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.REGISTER_HOUSES:
			return action.houses.map(v => v.id)

		default:
			return state
	}
}
