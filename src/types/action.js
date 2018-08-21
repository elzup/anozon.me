// @flow
import type { Action as AuthContainerAction } from '../containers/AuthContainer/actionTypes'
import type { Action as FormContainerAction } from '../containers/FormContainer/actionTypes'
import type { Action as HouseContainerAction } from '../containers/HouseContainer/actionTypes'
import type { Action as LogContainerAction } from '../containers/LogContainer/actionTypes'
import type { Action as NetworkAction } from '../containers/Network/actionTypes'
import type { Action as SettingContainerAction } from '../containers/SettingContainer/actionTypes'

export type ReduxInitAction = {
	type: '@@INIT',
}

export type Action =
	| ReduxInitAction
	| AuthContainerAction
	| FormContainerAction
	| HouseContainerAction
	| LogContainerAction
	| NetworkAction
	| SettingContainerAction
