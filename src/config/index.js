// @flow

import _combineReducers from './combineReducers'
let { NODE_ENV } = process.env


type Config = {
	+isDev: boolean,
	+api: {
		+url: string,
	},
}
const isDev = NODE_ENV === 'development'

const configDevelopment = {
}
const configProduction = {
}

const config: Config = {
	isDev,
	api: {
		url: '',
	},
	...(isDev ? configDevelopment : configProduction),
}

export const combineReducers = _combineReducers

export default config
