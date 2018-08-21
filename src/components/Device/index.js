// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import moment from 'moment'
import _ from 'lodash'

import type { Log } from '../../types'

type Props = {
	isActive: boolean,
	log: Log,
}

const Device = (props: Props) => {
	const time = moment(props.log.createdAt)
	const round = num => _.round(num, 1)
	return (
		<Grid container>
			<Grid item xs={12} md={4}>
				{props.isActive ? (
					<Typography variant="display1" color="primary">
						稼働中
					</Typography>
				) : (
					<div>
						<Typography variant="display1">停止中</Typography>
						<Typography variant="subheading" color="error">
							5分以上ログが来ていません
						</Typography>
					</div>
				)}
				<Typography variant="title">{time.format('LLLL')}</Typography>
			</Grid>
			<Grid item xs={12} md={8}>
				<Grid container>
					<Grid item xs={4} md={3}>
						<Typography variant="subheading">温度</Typography>
						<Typography variant="display1">{round(props.log.tmp)}℃</Typography>
					</Grid>
					<Grid item xs={4} md={3}>
						<Typography variant="subheading">湿度</Typography>
						<Typography variant="display1">{round(props.log.hmd)}％</Typography>
					</Grid>
					<Grid item xs={4} md={3}>
						<Typography variant="subheading">CO2</Typography>
						<Typography variant="display1">
							{round(props.log.co2)}ppm
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Device
