// @flow
import * as React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import type { Trigger } from '../../types'
import Button from '@material-ui/core/Button'

type Props = {
	triggers: Trigger[],
	handleDelete: Function,
	disabled: boolean,
}

const TriggerList = (props: Props) => (
	<Table>
		<TableHead>
			<TableRow>
				<TableCell>条件</TableCell>
				<TableCell />
			</TableRow>
		</TableHead>
		<TableBody>
			{props.triggers.map((trigger, i) => (
				<TableRow key={trigger.id} data-test={`trigger-item-${i}`}>
					<TableCell component="th" scope="row">
						{trigger.label}
					</TableCell>
					<TableCell>
						<Button
							disabled={props.disabled}
							onClick={() => {
								props.handleDelete({ triggerId: trigger.id })
							}}
							data-test={`trigger-del-btn-${i}`}
						>
							削除
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
)

export default TriggerList
