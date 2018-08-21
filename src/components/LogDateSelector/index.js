// @flow
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'

type Props = {
	day: string,
	handleSubmit: Function,
	handleSubmitToday: Function,
	isToday: boolean,
}

class LogDateSelector extends React.Component<Props> {
	dateRef: ?HTMLInputElement
	render() {
		const { props } = this
		return (
			<div>
				<TextField
					id="log_view_date"
					label="日付"
					type="date"
					defaultValue={props.day}
					InputLabelProps={{
						shrink: true,
					}}
					inputRef={r => {
						this.dateRef = r
					}}
					inputProps={{
						step: 300, // 5 min
					}}
				/>
				<Button
					variant="outlined"
					onClick={e => {
						props.handleSubmit({ day: this.dateRef && this.dateRef.value })
					}}
				>
					他の日を見る
				</Button>

				{!props.isToday && (
					<Button
						onClick={props.handleSubmitToday}
						variant="contained"
						color="primary"
					>
						今日
					</Button>
				)}
			</div>
		)
	}
}

export default LogDateSelector
