import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TopScreen from '../../components/TopScreen'
import ProfileScreen from '../../components/ProfileScreen'
import WorkScreen from '../../components/WorkScreen'
import HobbyScreen from '../../components/HobbyScreen'
import Footer from '../../components/Footer'

import { State as RootState } from '../../types'
import { cssDoodle } from '../../utils'

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
	z-index: -2;
	left: 0;
	top: 100%;
	width: 100%;
	background: linear-gradient(white 0%, #e6e6e6 100%);
`

const DoodleBackground = cssDoodle`
  :doodle {
		@grid: 24x12;
		width: 100vw;
		height: 200vw;
  }
  color: #ddd;
  clip-path: polygon(@pick(
    '0 0, 100% 0, 100% 100%',
    '0 0, 0 100%, 100% 100%',
    '0 0, 100% 0, 0 100%, ',
    '0 0, 0 0, 0 0',
  ));

  background: hsl(0, 0%, calc(95% + @abs(@row() / @size-row() - 0.5) * 10%));

	margin: -.5px;

	// transition: all 3s;
  // transition-timing: ease-in-out;

  :hover { 
		// transform: rotate(90deg);
		// transform: rotate(1080deg);
  	// clip-path: none;
	}
  
  :after {
    content: '\\@hex(@rand(0x250C, 0x254B))';
    font-size: 8vmax;
    color: white;
  }
`

type Props = {}
const TopPage: React.SFC<Props> = () => (
	<MainFrame>
		<TopScreen />
		<SecondScreen>
			<DoodleBackground
				style={{
					zIndex: -1,
					position: 'absolute',
				}}
			/>
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
