// @flow
import type { ThunkAction } from '../../types'
import * as actions from './actions'
import * as selectors from './selectors'

export function toggleEditScenario() {
	return toggleConfig('editScenario')
}

export function toggleEditControl() {
	return toggleConfig('editControl')
}

export function toggleEditTrigger() {
	return toggleConfig('editTrigger')
}

export function toggleEditEvent() {
	return toggleConfig('editEvent')
}

export function toggleConfig(
	confName: 'editScenario' | 'editTrigger' | 'editControl' | 'editEvent',
): ThunkAction {
	return async (dispatch, getState) => {
		const config = selectors.getAppConfig(getState())
		dispatch(actions.updateConfig({ ...config, [confName]: !config[confName] }))
	}
}
