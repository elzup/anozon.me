// @flow

import _combineReducers from './combineReducers'
let { NODE_ENV, REACT_APP_GA } = process.env

type Config = {
	+isDev: boolean,
	+ga: string,
	+api: {
		+url: string,
	},
}
const isDev = NODE_ENV === 'development'

const configDevelopment = {}
const configProduction = {}

const config: Config = {
	isDev,
	ga: REACT_APP_GA || '',
	api: {
		url: '',
	},
	...(isDev ? configDevelopment : configProduction),
}

export const combineReducers = _combineReducers

export default config
