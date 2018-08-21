// @flow
import * as React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import type { Scenario } from '../../types'
import Button from '@material-ui/core/Button'

type Props = {
	scenarios: Scenario[],
	disabled: boolean,
	handleSwitch: Function,
	handleDelete: Function,
}

const ScenarioList = (props: Props) =>
	props.scenarios.length === 0 ? (
		<Typography variant="subheading">シナリオがありません</Typography>
	) : (
		<List>
			{props.scenarios.map((scenario, i) => (
				<ListItem key={scenario.id} data-test={`scenario-item-${i}`}>
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
						data-test={`scenario-link-${i}`}
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
					<Button
						variant="contained"
						size="small"
						color="secondary"
						disabled={props.disabled}
						onClick={e => {
							props.handleDelete(scenario)
						}}
						data-test={`scenario-del-btn-${i}`}
					>
						削除
					</Button>
				</ListItem>
			))}
		</List>
	)

export default ScenarioList
