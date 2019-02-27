import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from './actions'
import { System } from '../../types'

export type State = System

const initialState = {} as State

export default reducerWithInitialState(initialState).case(
	actions.updateSystem,
	(state, system) => {
		return { ...state, ...system }
	}
)
