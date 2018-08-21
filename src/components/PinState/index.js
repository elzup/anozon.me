// @flow
import * as React from 'react'
import _ from 'lodash'

import type { House } from '../../types'
import Typography from '@material-ui/core/Typography'

type Props = {
	house: House,
}

const hexPinCode = v => 'ff' + _.padStart(v.toString(16), 4, '0')
const isActive = (pin: number, i: number) => {
	return Boolean((pin >> i) & 1)
}

type PinUnit = {
	active: boolean,
	label: string,
}

type PinGraph = {
	up8Pins: PinUnit[],
	down8Pins: PinUnit[],
}

const Lamp = ({ pin }: { pin: PinUnit }) => (
	<div
		style={{
			flex: 1,
			textAlign: 'center',
			color: 'white',
			borderLeft: 'solid #000088 5px',
			borderBottom: 'solid #000088 5px',
			background: pin.active ? 'orange' : '#aaa',
		}}
	>
		{pin.label}
	</div>
)

function toPinGraph(n: number): PinGraph {
	return {
		up8Pins: _.range(8, 0, -1).map(i => ({
			label: `K${i}`,
			active: isActive(n, i - 1),
		})),
		down8Pins: _.range(9, 17).map(i => ({
			label: `K${i}`,
			active: isActive(n, i - 1),
		})),
	}
}

const PinState = (props: Props) => {
	const pinGraph = toPinGraph(props.house.pin)
	return (
		<div>
			<Typography variant="subheading">
				pin: {props.house.pin}({hexPinCode(props.house.pin)})
			</Typography>
			<div style={{ maxWidth: '300px', width: '100%' }}>
				<div style={{ display: 'flex' }}>
					{pinGraph.up8Pins.map((pin, i) => <Lamp key={i} pin={pin} />)}
				</div>
				<div style={{ display: 'flex' }}>
					{pinGraph.down8Pins.map((pin, i) => <Lamp key={i} pin={pin} />)}
				</div>
			</div>
		</div>
	)
}

export default PinState
