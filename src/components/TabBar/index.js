// @flow
import * as React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import config from '../../config'

export type Props = {
	onPush: any,
	value: any,
}

const TabBar = (props: Props) => (
	<BottomNavigation
		style={{ height: config.tabBarHeight }}
		value={props.value}
		onChange={(event, value) => {
			props.onPush(value)
		}}
	>
		<BottomNavigationAction value="/" label="ログ" />
		<BottomNavigationAction value="/events" label="イベント" />
	</BottomNavigation>
)

export default TabBar
