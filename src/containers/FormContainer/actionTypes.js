// @flow
import type { ControlField } from '../../types'

export const OPEN_EDIT_CONTROL: 'FormContainer/OPEN_EDIT_CONTROL' =
	'FormContainer/OPEN_EDIT_CONTROL'
export const CLOSE_EDIT_CONTROL: 'FormContainer/CLOSE_EDIT_CONTROL' =
	'FormContainer/CLOSE_EDIT_CONTROL'

export const Actions = {
	OPEN_EDIT_CONTROL,
	CLOSE_EDIT_CONTROL,
}

export type OpenEditControl = {
	type: typeof OPEN_EDIT_CONTROL,
	control: ControlField,
}

export type CloseEditControl = {
	type: typeof CLOSE_EDIT_CONTROL,
}

export type Action = OpenEditControl | CloseEditControl
