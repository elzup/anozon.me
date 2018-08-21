// @flow
import type { Action, ID, House } from '../../types'
import { Actions } from '../HouseContainer/actionTypes'

export type State = { [id: ID]: House }

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.REGISTER_HOUSES:
			return action.houses.reduce(
				(p, c) => ({
					...p,
					[c.id]: c,
				}),
				state,
			)

		default:
			return state
	}
}
