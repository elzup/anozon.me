// @flow
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import * as React from 'react'
import Typography from '@material-ui/core/Typography'

import LogContainer from '../LogContainer'
import type { State, House, ID } from '../../types'
import ControlList from '../ControlContainer/ControlList'
import Device from '../../components/Device'
import PinState from '../../components/PinState'
import ScenarioList from '../ScenarioContainer/ScenarioList'
import * as logics from './logic'
import * as selectors from './selectors'

type OProps = {
	match: {
		params: {
			id: ID,
		},
	},
}
type Props = {
	house: House,
	loadHouses: Function,
	isLoading: boolean,
}

class Container extends React.Component<Props> {
	componentDidMount() {
		this.props.loadHouses()
	}

	render() {
		const { props } = this
		return (
			<div>
				<Grid container justify={'center'}>
					<Grid item xs={12} sm={10}>
						<Button component={props => <Link to={`/`} {...props} />}>
							←ハウス一覧へ戻る
						</Button>

						<Typography variant="display1">{props.house.name}</Typography>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<Typography variant="title">デバイス状態</Typography>
							<Device
								isActive={props.house.isActive}
								log={props.house.lastLog}
							/>
						</Paper>

						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<Typography variant="title">ログ</Typography>
							<LogContainer />
						</Paper>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<ScenarioList houseId={props.house.id} />
						</Paper>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<Typography variant="title">ピンの状態</Typography>
							<PinState house={props.house} />
						</Paper>
						<Paper style={{ padding: '20px', marginTop: '10px' }}>
							<ControlList houseId={props.house.id} />
						</Paper>
					</Grid>
				</Grid>
			</div>
		)
	}
}

const ms = (state: State, op: OProps) => {
	const houseId = op.match.params.id
	return {
		house: selectors.getHouse(state, houseId),
		isLoading: state.Network.isLoading,
	}
}

const conn = connect(ms, {
	loadHouses: logics.loadHouses,
})

export default conn(Container)
