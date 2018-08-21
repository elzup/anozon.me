// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import type { Scenario } from '../../types'

type Props = {
	scenario: Scenario,
	handleSubmit: Function,
	handleDelete: Function,
	disabled: boolean,
}

class ScenarioForm extends React.Component<Props> {
	labelRef: ?HTMLInputElement

	onSubmit = () => {
		if (!this.labelRef) {
			return
		}
		this.props.handleSubmit({
			...this.props.scenario,
			name: this.labelRef.value,
		})
		if (!this.labelRef || !this.props.scenario.isNew) {
			return
		}
		this.labelRef.value = ''
	}

	componentWillReceiveProps(nextProps: Props) {
		if (!this.labelRef) {
			return
		}
		this.labelRef.value = nextProps.scenario.name
	}

	render() {
		const { props } = this
		return (
			<div>
				<form>
					<TextField
						id="name"
						required
						label="名前"
						disabled={props.disabled}
						defaultValue={props.scenario.name}
						margin="normal"
						inputRef={r => {
							this.labelRef = r
						}}
						inputProps={{ 'data-test': 'scenario-input-name' }}
					/>
					{props.scenario.isNew ? (
						<Button
							variant="contained"
							size="small"
							disabled={props.disabled}
							onClick={this.onSubmit}
							data-test="create-scenario-btn"
						>
							作成
						</Button>
					) : (
						<React.Fragment>
							<Button
								variant="contained"
								size="small"
								disabled={props.disabled}
								onClick={this.onSubmit}
								data-test={`scenario-update-btn`}
							>
								更新
							</Button>
							<Button
								variant="contained"
								size="small"
								color="secondary"
								disabled={props.disabled}
								onClick={e => {
									props.handleDelete(props.scenario)
								}}
								data-test={`scenario-del-btn`}
							>
								削除
							</Button>
						</React.Fragment>
					)}
				</form>
			</div>
		)
	}
}

export default ScenarioForm
