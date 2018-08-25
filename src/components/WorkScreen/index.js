// @flow
import * as React from 'react'
import Screen from '../Screen'

type Props = {}

const WorkScreen = (props: Props) => {
	return (
		<Screen id="profile" title="Works" description="作ったもの">
			{JSON.stringify(props)}
		</Screen>
	)
}

export default WorkScreen
