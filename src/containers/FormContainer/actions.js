// @flow
import type { ControlField } from '../../types'

import { OPEN_EDIT_CONTROL, CLOSE_EDIT_CONTROL } from './actionTypes'
import type { OpenEditControl, CloseEditControl } from './actionTypes'

export function openEditControl(control: ControlField): OpenEditControl {
	return {
		type: OPEN_EDIT_CONTROL,
		control,
	}
}
export function closeEditControl(): CloseEditControl {
	return {
		type: CLOSE_EDIT_CONTROL,
	}
}
