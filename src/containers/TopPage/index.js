// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import type { State as RootState } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const TopScreen = styled.div`
	position: absolute;
	left: calc(50% - 50vmin);
	top: calc(50% - 50vmin);
	width: 100vmin;
	height: 100vmin;
	background-color: #aaa;
	overflow: hidden;
`

const SecondScreen = styled.div`
	position: absolute;
	left: 0;
	top: 100%;
	width: 100%;
	background-color: orange;
	overflow: hidden;
`

const Circle = styled.div`
	position: absolute;
	top: calc(100% / 2 - 100vmax / 2);
	left: calc(100% / 2 - 100vmax / 2);
	width: 100vmax;
	height: 100vmax;
	border: solid black 1px;
	border-radius: 50%;
`

const DecoWrap = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
`

const Decoration = () => (
	<DecoWrap>
		<Circle />
	</DecoWrap>
)

type Props = {}

const C = (props: Props) => {
	return (
		<MainFrame>
			<Decoration />
			<TopScreen>
				<h1>new node</h1>
				<a href="#profile">Profile</a>
				<a href="#work">Work</a>
				<a href="#hobby">Hobby</a>
				<a href="">
					<FontAwesomeIcon icon={['fab', 'twitter']} />
				</a>
				<a href="">
					<FontAwesomeIcon icon={['fab', 'github']} />
				</a>
				<a href="">
					<FontAwesomeIcon icon={['fab', 'youtube']} />
				</a>
				<a href="">
					<FontAwesomeIcon icon={'pen-nib'} />
				</a>
				<a href="">
					<FontAwesomeIcon icon={'gift'} />
				</a>
			</TopScreen>
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
