// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import CreateControlForm from '../../components/CreateControlForm'
import EditModeButton from '../../components/EditModeButton'
import ControlRow from './ControlRow'

import type { House, ID, State } from '../../types'
import * as logics from '../HouseContainer/logic'
import * as selectors from '../HouseContainer/selectors'
import * as configLogics from '../SettingContainer/logic'

type OProps = {
	houseId: ID,
}

type Props = {
	house: House,
	disabled: boolean,
	editMode: boolean,

	createControl: typeof logics.createControl,
	toggleEditControl: typeof configLogics.toggleEditControl,
}

class ControlList extends React.Component<Props> {
	render() {
		const { props } = this
		return (
			<div>
				<div style={{ display: 'flex' }}>
					<Typography variant="title" style={{ flex: 1 }}>
						コントロール一覧
					</Typography>
					<EditModeButton
						handleClick={props.toggleEditControl}
						editMode={props.editMode}
						props={{
							'data-test': 'control-edit-btn',
						}}
					/>
				</div>
				{props.house.controls.length === 0 && (
					<Typography variant="subheading">コントロールがありません</Typography>
				)}
				<List component="nav">
					{props.house.controls.map((control, i) => (
						<ControlRow key={i} keyi={`${i}`} control={control} />
					))}
				</List>
				{props.editMode && (
					<CreateControlForm
						disabled={props.disabled}
						handleSubmit={v =>
							props.createControl({
								...v,
								houseId: props.house.id,
							})
						}
					/>
				)}
			</div>
		)
	}
}

const ms = (state: State, op: OProps) => ({
	house: selectors.getHouse(state, op.houseId),
	disabled: state.Network.isLoading,
	editMode: state.SettingContainer.editControl,
})

const conn = connect(ms, {
	createControl: logics.createControl,
	toggleEditControl: configLogics.toggleEditControl,
})

export default conn(ControlList)
