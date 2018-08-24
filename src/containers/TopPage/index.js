// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TopScreen from '../../components/TopScreen'

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
	background-color: orange;
	overflow: hidden;
`
type Props = {}

const C = (props: Props) => {
	return (
		<MainFrame>
			<TopScreen />
			<SecondScreen>
				<div id="work">Work line</div>
				<div id="hobby">Hobby line</div>
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
