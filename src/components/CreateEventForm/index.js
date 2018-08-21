// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import _ from 'lodash'

import type { House, Trigger, ID, SubControl } from '../../types'

type Props = {
	house: House,
	scenarioId: ID,
	handleSubmit: Function,
	disabled: boolean,
}

function addTrigger(triggers: Trigger[]): Trigger[] {
	return [
		{
			id: 0,
			houseId: 0,
			sensor: 0,
			sensorValue: 0,
			rule: '>',
			high: null,
			low: null,
			createdAt: '',
			label: '(なし)',
		},
		...triggers,
	]
}

class CreateEventForm extends React.Component<Props> {
	labelRef: ?HTMLInputElement
	triggerIdRef: ?HTMLInputElement
	controlIdRef: ?HTMLInputElement
	startTimeRef: ?HTMLInputElement
	endTimeRef: ?HTMLInputElement
	aIntervalRef: ?HTMLInputElement
	nIntervalRef: ?HTMLInputElement

	onSubmit = () => {
		if (
			!this.triggerIdRef ||
			!this.controlIdRef ||
			!this.startTimeRef ||
			!this.endTimeRef ||
			!this.aIntervalRef ||
			!this.nIntervalRef
		) {
			return
		}
		this.props.handleSubmit({
			scenarioId: this.props.scenarioId,
			triggerId: this.triggerIdRef.value,
			subControlId: this.controlIdRef.value,
			startTime: this.startTimeRef.value,
			endTime: this.endTimeRef.value,
			activeInterval: this.aIntervalRef.value,
			negativeInterval: this.nIntervalRef.value,
		})
	}

	render() {
		const { props } = this
		const subControls: SubControl[] = _.flatten(
			props.house.controls.map(c => c.subControls),
		)
		return (
			<div>
				<form>
					<TextField
						id="trigger"
						select
						label="トリガー"
						disabled={this.props.disabled}
						SelectProps={{
							native: true,
						}}
						inputRef={r => {
							this.triggerIdRef = r
						}}
						helperText=""
						margin="normal"
						inputProps={{ 'data-test': 'event-trigger-id-input' }}
					>
						{addTrigger(props.house.triggers).map((trigger, i) => (
							<option
								key={trigger.id}
								value={trigger.id}
								data-test={`event-trigger-option-${i}`}
							>
								{trigger.label}
							</option>
						))}
					</TextField>
					<TextField
						id="control"
						select
						label="コントロール"
						disabled={this.props.disabled}
						SelectProps={{
							native: true,
						}}
						inputRef={r => {
							this.controlIdRef = r
						}}
						helperText=""
						margin="normal"
						inputProps={{ 'data-test': 'event-subControl-id-input' }}
					>
						{subControls.map((sc, i) => (
							<option
								key={sc.id}
								value={sc.id}
								data-test={`event-subControl-option-${i}`}
							>
								{sc.label}
							</option>
						))}
					</TextField>
					<TextField
						id="start_time"
						label="開始時刻"
						disabled={this.props.disabled}
						type="time"
						defaultValue="07:30"
						InputLabelProps={{
							shrink: true,
						}}
						inputRef={r => {
							this.startTimeRef = r
						}}
						inputProps={{
							step: 300, // 5 min
							'data-test': 'event-start-time-input',
						}}
					/>
					<TextField
						id="end_time"
						label="終了時刻"
						disabled={this.props.disabled}
						type="time"
						defaultValue="20:00"
						InputLabelProps={{
							shrink: true,
						}}
						inputRef={r => {
							this.endTimeRef = r
						}}
						inputProps={{
							step: 300, // 5 min
							'data-test': 'event-end-time-input',
						}}
					/>
					<TextField
						id="active-interval"
						label="Onインターバル(分)"
						disabled={this.props.disabled}
						type="number"
						defaultValue="0"
						inputRef={r => {
							this.aIntervalRef = r
						}}
						inputProps={{ 'data-test': 'event-active-interval-input' }}
					/>
					<TextField
						id="negative-interval"
						label="Offインターバル(分)"
						disabled={this.props.disabled}
						type="number"
						defaultValue="0"
						inputRef={r => {
							this.nIntervalRef = r
						}}
						inputProps={{ 'data-test': 'event-negative-interval-input' }}
					/>
					<Button
						disabled={this.props.disabled}
						variant="raised"
						onClick={this.onSubmit}
						data-test="create-event-btn"
					>
						追加
					</Button>
				</form>
			</div>
		)
	}
}
export default CreateEventForm
