// @flow
import React from 'react'
import { Line } from 'react-chartjs-2'
import type { Log } from '../../types'

import _ from 'lodash'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'

function makeData(data: any[]) {
	return {
		// labels: _.range(0, 24, 1).map(v => `${v}:00`),
		datasets: [
			{
				fill: false,
				// lineTension: 1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				steppedLine: true,
				data: data,
			},
		],
	}
}

export type GraphOption = {
	min: number,
	max: number,
	unit: string,
}

function makeOption({ min, max, unit }: GraphOption) {
	return {
		legend: {
			display: false,
		},
		title: {
			// display: true,
			// text: 'Chart.js Time Scale',
		},
		scales: {
			xAxes: [
				{
					type: 'time',
					time: {
						displayFormats: {
							minute: 'H:mm',
						},
						parser: 'HH:mm',
						min: '00:00',
						max: '24:00',
						unit: 'minute',
						stepSize: 120,
					},
					scaleLabel: {
						display: false,
					},
				},
			],
			yAxes: [
				{
					scaleLabel: {
						display: false,
					},
					ticks: {
						beginAtZero: true,
						min: min,
						max: max,
					},
				},
			],
		},
	}
}

function toXY(logs: Log[], sensorKey: string): Array<{ x: string, y: number }> {
	return _.map(logs, log => {
		return { x: moment(log.createdAt).format('HH:mm'), y: log[sensorKey] }
	})
}

type Props = {
	logs: Log[],
	title: string,
	options: GraphOption,
	sensorKey: string,
}

const DayLogLineGraph = (props: Props) => {
	// const data = toLiner(props.logs, props.sensorKey)
	const data = toXY(props.logs, props.sensorKey)
	return (
		<div>
			<Typography variant="title">{props.title}</Typography>
			<Line
				height={100}
				data={makeData(data)}
				options={makeOption(props.options)}
			/>
		</div>
	)
}
export default DayLogLineGraph
