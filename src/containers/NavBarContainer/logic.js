// @flow
import type { State, ThunkAction } from '../../types'
import moment from 'moment'

type Report = {
	time: string,
	state: State,
}

function download(json: Report, name: string) {
	const href =
		'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
	const a = document.createElement('a')
	a.setAttribute('href', href)
	a.setAttribute('download', name + '.json')
	document.body && document.body.appendChild(a)
	a.click()
	a.remove()
}

// remove logs
const trimState = (state: State): State => {
	return { ...state, LogContainer: {} }
}

export function downloadReport(): ThunkAction {
	return async (dispatch, getState) => {
		const time = moment().format('YYYYMMDD-HHmmss')
		const state = trimState(getState())
		download({ time, state }, `farmcon-report-${time}`)
	}
}
