// @flow

import _combineReducers from './combineReducers'
let { NODE_ENV, REACT_APP_API_URL } = process.env

if (!REACT_APP_API_URL) {
	console.warn('Configuration not completed. must setup envioraments.')
	REACT_APP_API_URL = '-'
	console.info(process.env)
}

type Config = {
	+isDev: boolean,
	+appName: string,
	+appPath: string,
	+activeJudgeSpan: { [key: string]: number },
	+tabBarHeight: number,
	+api: {
		+url: string,
	},
}
const isDev = NODE_ENV === 'development'

const configDevelopment = {
	appName: 'FarmController (Dev)',
}
const configProduction = {
	appName: 'FarmController',
}

const config: Config = {
	isDev,
	appPath: '/',
	activeJudgeSpan: { minutes: 5 },
	api: {
		url: REACT_APP_API_URL,
	},
	tabBarHeight: 40,
	...(isDev ? configDevelopment : configProduction),
}

export const combineReducers = _combineReducers

export default config
