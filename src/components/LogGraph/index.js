// @flow
import * as React from 'react'
import _ from 'lodash'

import type { ID, DayLogById } from '../../types'
import DayLogLineGraph from '../DayLogLineGraph'
import SunsetBar from '../SunsetBar'

import Typography from '@material-ui/core/Typography'
import LogDateSelector from '../LogDateSelector'

export type Props = {
	dayLogs: DayLogById,
	day: string,
	isToday: boolean,
	houseId: ID,
	handleSubmit: Function,
	handleSubmitToday: Function,
}

const LogGraph = (props: Props) => (
	<div>
		<Typography variant="title">{props.day}</Typography>

		<LogDateSelector
			handleSubmit={props.handleSubmit}
			handleSubmitToday={props.handleSubmitToday}
			isToday={props.isToday}
			day={props.day}
		/>

		<DayLogLineGraph
			title={'温度'}
			sensorKey={'tmp'}
			logs={props.dayLogs.logs}
			options={{ min: 10, max: 45, unit: '℃' }}
		/>
		<Typography variant="body1">
			最高気温: {_.round(props.dayLogs.tempMax, 3)}
		</Typography>
		<Typography variant="body1">
			最低気温: {_.round(props.dayLogs.tempMin, 3)}
		</Typography>

		<SunsetBar day={props.day} />

		<DayLogLineGraph
			title={'湿度'}
			sensorKey={'hmd'}
			logs={props.dayLogs.logs}
			options={{ min: 10, max: 100, unit: '％' }}
		/>

		<DayLogLineGraph
			title={'飽差'}
			sensorKey={'vpd'}
			logs={props.dayLogs.logs}
			options={{ min: 0, max: 20, unit: '' }}
		/>
		<DayLogLineGraph
			title={'CO2'}
			sensorKey={'co2'}
			logs={props.dayLogs.logs}
			options={{ min: 0, max: 1500, unit: 'ppm' }}
		/>
	</div>
)

export default LogGraph
