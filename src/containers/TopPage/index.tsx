import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TopScreen from '../../components/TopScreen'
import ProfileScreen from '../../components/ProfileScreen'
import WorkScreen from '../../components/WorkScreen'
import HobbyScreen from '../../components/HobbyScreen'
import Footer from '../../components/Footer'

import { State as RootState } from '../../types'

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

const TopPage: React.SFC<Props> = () => (
	<MainFrame>
		<TopScreen />
		<SecondScreen>
			<ProfileScreen />
			<WorkScreen />
			<HobbyScreen />
			<Footer />
		</SecondScreen>
	</MainFrame>
)

const ms = (state: RootState) => ({})

const conn = connect(
	ms,
	{}
)

export default conn(TopPage)