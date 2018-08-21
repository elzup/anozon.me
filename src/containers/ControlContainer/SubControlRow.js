// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import type { State, Control, SubControl } from '../../types'
import * as logics from '../HouseContainer/logic'

type OProps = {
	control: Control,
	subControl: SubControl,
	keyi: string,
}

type Props = {
	control: Control,
	subControl: SubControl,
	keyi: string,
	disabled: boolean,
	editMode: boolean,

	deleteSubControl: typeof logics.deleteSubControl,
	runSubControl: typeof logics.runSubControl,
}

class Container extends React.Component<Props> {
	render() {
		const { props } = this
		return (
			<ListItem
				data-test={`subControl-item-${props.keyi}`}
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<div style={{ display: 'flex' }}>
					<Typography variant="subheading">{props.subControl.name}</Typography>
					-
					<Typography variant="subheading">
						{props.control.timer * props.subControl.rate / 100}秒
					</Typography>
					-
					<Typography variant="subheading">
						({props.subControl.rate}%)
					</Typography>
				</div>
				<div style={{ marginLeft: '1em', display: 'flex' }}>
					{props.editMode && (
						<Button
							disabled={props.disabled}
							variant="contained"
							color="secondary"
							onClick={() => {
								props.deleteSubControl(props.subControl)
							}}
							data-test={`control-del-btn-${props.keyi}`}
						>
							削除
						</Button>
					)}
					<Button
						variant="contained"
						disabled={props.disabled}
						onClick={() => {
							props.runSubControl(props.subControl)
						}}
					>
						実行
					</Button>
				</div>
			</ListItem>
		)
	}
}

const ms = (state: State, op: OProps) => ({
	...op,
	disabled: state.Network.isLoading,
	editMode: state.SettingContainer.editControl,
})

const conn = connect(ms, {
	deleteSubControl: logics.deleteSubControl,
	runSubControl: logics.runSubControl,
})

export default conn(Container)
