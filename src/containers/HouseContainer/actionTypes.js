// @flow
import type { House } from '../../types'

export const REGISTER_HOUSES: 'HouseContainer/REGISTER_HOUSES' =
	'HouseContainer/REGISTER_HOUSES'

export const Actions = {
	REGISTER_HOUSES,
}

export type RegisterHouses = {
	type: typeof REGISTER_HOUSES,
	houses: House[],
}

export type Action = RegisterHouses
