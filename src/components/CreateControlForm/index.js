// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type Props = {
	handleSubmit: Function,
	disabled: boolean,
}

function orNoneValue(v: any) {
	return (v && v.value) || -1
}

class CreateControlForm extends React.Component<Props> {
	labelRef: ?HTMLInputElement
	activePinRef: ?HTMLInputElement
	negativePinRef: ?HTMLInputElement
	timerRef: ?HTMLInputElement

	onSubmit = () => {
		if (
			!this.labelRef ||
			!this.activePinRef ||
			!this.negativePinRef ||
			!this.timerRef
		) {
			return
		}
		this.props.handleSubmit({
			label: this.labelRef.value,
			timer: this.timerRef.value,
			activePin: orNoneValue(this.activePinRef),
			negativePin: orNoneValue(this.negativePinRef),
		})
		if (
			!this.labelRef ||
			!this.activePinRef ||
			!this.negativePinRef ||
			!this.timerRef
		) {
			return
		}
		this.labelRef.value = ''
		this.activePinRef.value = ''
		this.negativePinRef.value = ''
		this.timerRef.value = ''
	}
	render() {
		return (
			<div>
				<form>
					<TextField
						id="name"
						required
						label="名前"
						disabled={this.props.disabled}
						margin="normal"
						inputRef={r => {
							this.labelRef = r
						}}
						inputProps={{ 'data-test': 'control-input-name' }}
					/>
					<TextField
						id="activePin-input"
						label="アクティブPIN"
						disabled={this.props.disabled}
						inputRef={r => {
							this.activePinRef = r
						}}
						type="number"
						margin="normal"
						inputProps={{ 'data-test': 'control-input-activePin' }}
					/>
					<TextField
						id="negativePin-input"
						label="ネガティブPIN"
						disabled={this.props.disabled}
						inputRef={r => {
							this.negativePinRef = r
						}}
						type="number"
						margin="normal"
						inputProps={{ 'data-test': 'control-input-negativePin' }}
					/>
					<TextField
						id="timer-input"
						label="実行時間(秒)"
						disabled={this.props.disabled}
						inputRef={r => {
							this.timerRef = r
						}}
						type="number"
						margin="normal"
						inputProps={{ 'data-test': 'control-input-timer' }}
					/>
					<Button
						variant="raised"
						onClick={this.onSubmit}
						disabled={this.props.disabled}
						data-test="control-submit-btn"
					>
						追加
					</Button>
				</form>
			</div>
		)
	}
}

export default CreateControlForm
