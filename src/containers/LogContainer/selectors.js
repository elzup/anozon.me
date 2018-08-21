// @flow
import type { State, DayLogById } from '../../types'

export function getLogs(state: State, label: string): DayLogById {
	return state.LogContainer[label] || { tempMax: 0, tempMin: 0, logs: [] }
}
