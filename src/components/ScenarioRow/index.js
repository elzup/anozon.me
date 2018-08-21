// @flow
import * as React from 'react'

import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import type { Scenario } from '../../types'
import Button from '@material-ui/core/Button'

type Props = {
	scenario: Scenario,
	handleSwitch: Function,
	disabled: boolean,
	keyi: number,
}

const ScenarioRow = (props: Props) => {
	const { scenario, keyi } = props
	return (
		<ListItem key={scenario.id} data-test={`scenario-item-${keyi}`}>
			{scenario.isActive ? (
				<Button size="small" disabled variant="contained" color="primary">
					アクティブ
				</Button>
			) : (
				<Button
					variant="outlined"
					size="small"
					disabled={props.disabled}
					onClick={e => {
						props.handleSwitch(scenario)
					}}
				>
					切り替える
				</Button>
			)}
			<Link
				to={`/houses/${scenario.houseId}/scenarios/${scenario.id}`}
				data-test={`scenario-link-${keyi}`}
				{...props}
				style={{ flex: 1 }}
			>
				<Typography
					variant="subheading"
					style={{ marginLeft: '20px', textDecoration: 'underline' }}
				>
					{`${scenario.name} (イベント数 ${scenario.events.length})`}
				</Typography>
			</Link>
		</ListItem>
	)
}

export default ScenarioRow
