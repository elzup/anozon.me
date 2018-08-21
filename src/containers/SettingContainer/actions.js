// @flow
import type { AppConfig } from '../../types'

import { UPDATE_CONFIG } from './actionTypes'
import type { UpdateConfig } from './actionTypes'

export function updateConfig(config: AppConfig): UpdateConfig {
	return {
		type: UPDATE_CONFIG,
		config,
	}
}
