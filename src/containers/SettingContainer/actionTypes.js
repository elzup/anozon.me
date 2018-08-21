// @flow
import type { AppConfig } from '../../types'

export const UPDATE_CONFIG: 'SettingContainer/UPDATE_CONFIG' =
	'SettingContainer/UPDATE_CONFIG'

export const Actions = {
	UPDATE_CONFIG,
}

export type UpdateConfig = {
	type: typeof UPDATE_CONFIG,
	config: AppConfig,
}

export type Action = UpdateConfig
