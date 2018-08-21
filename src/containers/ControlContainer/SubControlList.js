// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'

import SubControlRow from './SubControlRow'
import type { State, Control } from '../../types'
import * as logics from '../HouseContainer/logic'

import CreateSubControlForm from '../../components/CreateSubControlForm'

type OProps = {
	control: Control,
	keyi: string,
}

type Props = {
	control: Control,
	keyi: string,
	disabled: boolean,
	editMode: boolean,

	createSubControl: typeof logics.createSubControl,
}

const SubControlList = (props: Props) => (
	<Collapse in unmountOnExit style={{ paddingLeft: '1em' }}>
		<List component="div" disablePadding>
			{props.control.subControls.map((sc, i) => (
				<SubControlRow
					control={props.control}
					subControl={sc}
					keyi={`${props.keyi}-${i}`}
					key={i}
				/>
			))}
		</List>
		{props.editMode && (
			<CreateSubControlForm
				disabled={props.disabled}
				controlId={props.control.id}
				handleSubmit={props.createSubControl}
			/>
		)}
	</Collapse>
)

const ms = (state: State, op: OProps) => ({
	control: op.control,
	keyi: op.keyi,
	disabled: state.Network.isLoading,
	editMode: state.SettingContainer.editControl,
})

const conn = connect(ms, {
	createSubControl: logics.createSubControl,
})

export default conn(SubControlList)
