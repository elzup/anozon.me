// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import type { ID } from '../../types'

type Props = {
	handleSubmit: Function,
	controlId: ID,
	disabled: boolean,
}

class CreateSubControlForm extends React.Component<Props> {
	nameRef: ?HTMLInputElement
	rateRef: ?HTMLInputElement

	onSubmit = () => {
		if (!this.nameRef || !this.rateRef) {
			return
		}
		this.props.handleSubmit({
			name: this.nameRef.value,
			rate: Number(this.rateRef.value),
			controlId: this.props.controlId,
		})
		if (!this.nameRef || !this.rateRef) {
			return
		}
		this.nameRef.value = ''
		this.rateRef.value = ''
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
							this.nameRef = r
						}}
						inputProps={{ 'data-test': 'subControl-input-name' }}
					/>
					<TextField
						id="rate-input"
						label="割合(0%〜100%)"
						required
						disabled={this.props.disabled}
						inputRef={r => {
							this.rateRef = r
						}}
						type="number"
						margin="normal"
						min={0}
						max={100}
						inputProps={{ 'data-test': 'subControl-input-rate' }}
					/>
					<Button
						variant="raised"
						onClick={this.onSubmit}
						disabled={this.props.disabled}
						data-test="subControl-submit-btn"
					>
						追加
					</Button>
				</form>
			</div>
		)
	}
}

export default CreateSubControlForm
