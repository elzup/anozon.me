// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

type Props = {
	handleClick: Function,
	editMode: boolean,
	props?: any,
}

const EditModeButton = (props: Props) => (
	<Button
		variant="contained"
		color={props.editMode ? 'primary' : 'default'}
		size="small"
		onClick={props.handleClick}
		{...props.props}
	>
		<SettingsIcon sytle={{ fontSize: '1em' }} />
		{props.editMode ? '完了' : '編集'}
	</Button>
)

export default EditModeButton
