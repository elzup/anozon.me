// @flow
import type { House } from '../../types'

import { REGISTER_HOUSES } from './actionTypes'
import type { RegisterHouses } from './actionTypes'

export function registerHouses(houses: House[]): RegisterHouses {
	return {
		type: REGISTER_HOUSES,
		houses,
	}
}
