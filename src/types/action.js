// @flow
import type { Action as SystemContainerAction } from '../containers/SystemContainer/actionTypes'

export type ReduxInitAction = {
	type: '@@INIT',
}

export type Action = ReduxInitAction | SystemContainerAction
