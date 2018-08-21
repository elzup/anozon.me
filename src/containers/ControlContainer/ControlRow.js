// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import AlarmIcon from '@material-ui/icons/Alarm'
import UpIcon from '@material-ui/icons/ArrowUpward'
import DownIcon from '@material-ui/icons/ArrowDownward'

import SubControlList from './SubControlList'

import type { State, Control } from '../../types'
import * as logics from '../HouseContainer/logic'

type OProps = {
	control: Control,
	keyi: string,
}

type Props = {
	control: Control,
	keyi: string,
	disabled: boolean,

	deleteControl: typeof logics.deleteControl,
	runControl: typeof logics.runControl,
	editMode: boolean,
}

const ControlRow = (props: Props) => (
	<React.Fragment>
		<ListItem
			data-test={`control-item-${props.control.id}`}
			style={{
				display: 'flex',

				borderTop: 'solid 1px black',
				...(props.control.isHit ? { background: '#d2ffd2' } : {}),
			}}
		>
			<div style={{ flex: 1, display: 'flex' }}>
				<Typography variant="title">{props.control.label}</Typography>
				<div style={{ padding: '5px' }}>
					{props.control.activePinView && (
						<Chip
							avatar={
								<Avatar>
									<UpIcon />
								</Avatar>
							}
							label={props.control.activePinView}
						/>
					)}
					{props.control.negativePinView && (
						<Chip
							avatar={
								<Avatar>
									<DownIcon />
								</Avatar>
							}
							label={props.control.negativePinView}
						/>
					)}
					{props.control.timer && (
						<Chip
							avatar={
								<Avatar>
									<AlarmIcon />
								</Avatar>
							}
							label={props.control.timer}
						/>
					)}
				</div>
			</div>
			{props.editMode && (
				<Button
					disabled={props.disabled}
					variant="contained"
					color="secondary"
					onClick={() => {
						props.deleteControl(props.control)
					}}
					data-test={`control-del-btn-${props.keyi}`}
				>
					削除
				</Button>
			)}
			<Button
				disabled={props.disabled}
				variant="contained"
				onClick={() => {
					props.runControl(props.control)
				}}
			>
				実行
			</Button>
		</ListItem>
		{props.control.timer && (
			<SubControlList control={props.control} keyi={props.keyi} />
		)}
	</React.Fragment>
)

const ms = (state: State, op: OProps) => ({
	...op,
	disabled: state.Network.isLoading,
	editMode: state.SettingContainer.editControl,
})

const conn = connect(ms, {
	deleteControl: logics.deleteControl,
	runControl: logics.runControl,
})

export default conn(ControlRow)
