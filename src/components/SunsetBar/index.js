// @flow
import * as React from 'react'
import SunCalc from 'suncalc'
import moment from 'moment'

type Props = {
	day: string,
}

const SunsetBar = (props: Props) => {
	const res = SunCalc.getTimes(new Date(props.day), 35.23, 136.43)
	const sunrise = moment(res.sunrise).unix()
	const sunset = moment(res.sunset).unix()
	const dayStart = moment(props.day).unix()
	const startRate = (sunrise - dayStart) / 86400 * 100
	const endRate = (sunset - dayStart) / 86400 * 100
	const w1 = startRate
	const w2 = endRate - startRate
	const w3 = 100 - w1 - w2
	return (
		<div style={{ width: '100%', height: '10px', display: 'flex' }}>
			<div style={{ backgroundColor: 'blue', width: `${w1}%` }} />
			<div style={{ backgroundColor: 'orange', width: `${w2}%` }} />
			<div style={{ backgroundColor: 'blue', width: `${w3}%` }} />
		</div>
	)
}

export default SunsetBar
