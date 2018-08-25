// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TopScreen from '../../components/TopScreen'
import ProfileScreen from '../../components/ProfileScreen'
import WorkScreen from '../../components/WorkScreen'
import HobbyScreen from '../../components/HobbyScreen'

import type { State as RootState } from '../../types'

// import * as selectors from './selectors'

const MainFrame = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: 100vmin;
	min-height: 100vmin;
`

const SecondScreen = styled.div`
	position: absolute;
	left: 0;
	top: 100%;
	width: 100%;
`
type Props = {}

const C = (props: Props) => {
	return (
		<MainFrame>
			<TopScreen />
			<SecondScreen>
				<ProfileScreen />
				<WorkScreen />
				<HobbyScreen />
			</SecondScreen>
		</MainFrame>
	)
}

class TopPage extends React.Component<Props> {
	render() {
		const { props } = this
		return C(props)
	}
}

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{},
)

export default conn(TopPage)
