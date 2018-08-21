// @flow
import * as React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import type { FarmEventFull } from '../../types'
import Button from '@material-ui/core/Button'

import moment from 'moment'

type Props = {
	farmEvents: FarmEventFull[],
	handleDelete: Function,
	handleToggleEnabled: Function,
	disabled: boolean,
}

function timeToText(fe: FarmEventFull) {
	const st = moment(fe.startTime)
	const ed = moment(fe.endTime)
	return `${st.format('HH:mm')}〜${ed.format('HH:mm')}`
}

const EventList = (props: Props) => (
	<Table>
		<TableHead>
			<TableRow>
				<TableCell>有効</TableCell>
				<TableCell>トリガー</TableCell>
				<TableCell>コントロール</TableCell>
				<TableCell>時間</TableCell>
				<TableCell>Onインターバル(分)</TableCell>
				<TableCell>Offインターバル(分)</TableCell>
				<TableCell />
			</TableRow>
		</TableHead>
		<TableBody>
			{props.farmEvents.map((fe, i) => (
				<TableRow key={fe.id} data-test={`event-item-${i}`}>
					<TableCell component="th" scope="row">
						<Checkbox
							color="default"
							checked={fe.enabled}
							tabIndex={-1}
							disableRipple
							disabled={props.disabled}
							onClick={() => {
								props.handleToggleEnabled(fe)
							}}
							inputProps={{
								'data-test': `event-toggle-btn-${i}`,
								'data-checked': fe.enabled,
							}}
							data-test={`event-${i}-enabled`}
						/>
					</TableCell>
					<TableCell
						component="th"
						scope="row"
						data-test={`event-${i}-trigger`}
					>
						{fe.trigger ? fe.trigger.label : '---'}
					</TableCell>
					<TableCell
						component="th"
						scope="row"
						data-test={`event-${i}-subControl`}
					>
						{fe.subControl.label}
					</TableCell>
					<TableCell component="th" scope="row" data-test={`event-${i}-time`}>
						{timeToText(fe)}
					</TableCell>
					<TableCell
						component="th"
						scope="row"
						data-test={`event-${i}-active-interval`}
					>
						{fe.activeInterval}
					</TableCell>
					<TableCell
						component="th"
						scope="row"
						data-test={`event-${i}-negative-interval`}
					>
						{fe.negativeInterval}
					</TableCell>
					<TableCell>
						<Button
							disabled={props.disabled}
							onClick={() => {
								props.handleDelete({ eventId: fe.id })
							}}
							data-test={`event-del-btn-${i}`}
						>
							削除
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
)

export default EventList
