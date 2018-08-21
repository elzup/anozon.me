// @flow
import Button from '@material-ui/core/Button'
import * as React from 'react'
import TextField from '@material-ui/core/TextField'

import type { ID } from '../../types'
import { sensorLib } from '../../utils'

type Props = {
	handleSubmit: Function,
	houseId: ID,
	disabled: boolean,
}

class CreateTriggerForm extends React.Component<Props> {
	sensorRef: ?HTMLInputElement
	lowRef: ?HTMLInputElement
	highRef: ?HTMLInputElement

	onSubmit = () => {
		if (!this.sensorRef || !this.highRef || !this.lowRef) {
			return // TODO
		}
		this.props.handleSubmit({
			houseId: this.props.houseId,
			sensor: this.sensorRef.value,
			high: this.highRef.value,
			low: this.lowRef.value,
		})
		// @HACKME
		if (!this.sensorRef || !this.highRef || !this.lowRef) {
			return
		}
	}
	render() {
		return (
			<div>
				<form>
					<TextField
						id="select-currency-native"
						select
						label="センサー"
						disabled={this.props.disabled}
						SelectProps={{
							native: true,
						}}
						inputRef={r => {
							this.sensorRef = r
						}}
						helperText=""
						margin="normal"
						inputProps={{ 'data-test': 'trigger-sensor-input' }}
					>
						{Object.values(sensorLib).map(v => (
							<option key={v.id} value={v.id}>
								{v.label}
							</option>
						))}
					</TextField>
					<TextField
						id="low"
						label="下限値"
						disabled={this.props.disabled}
						type="number"
						margin="normal"
						inputRef={r => {
							this.lowRef = r
						}}
						inputProps={{ 'data-test': 'trigger-sensor-value-input' }}
					/>
					<TextField
						id="high"
						label="上限値"
						disabled={this.props.disabled}
						type="number"
						margin="normal"
						inputRef={r => {
							this.highRef = r
						}}
						inputProps={{ 'data-test': 'trigger-sensor-value-input' }}
					/>
					<Button
						disabled={this.props.disabled}
						variant="raised"
						onClick={this.onSubmit}
						data-test="create-trigger-btn"
					>
						追加
					</Button>
				</form>
			</div>
		)
	}
}

export default CreateTriggerForm
