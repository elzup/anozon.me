// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import type { State as RootState } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import * as selectors from './selectors'

const meta = {
	w: 650,
	h: 650,
}

const MainFrame = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: ${meta.w}px;
	min-height: ${meta.h}px;
`

const TopScreen = styled.div`
	position: absolute;
	left: calc(50% - ${meta.w / 2}px);
	top: calc(50% - ${meta.h / 2}px);
	width: ${meta.w}px;
	height: ${meta.h}px;
	background-color: #aaa;
	overflow: hidden;
`

const SecondScreen = styled.div`
	position: absolute;
	left: calc(50% - ${meta.w / 2}px);
	top: 100%;
	width: ${meta.w}px;
	background-color: orange;
	overflow: hidden;
`

type Props = {}

const C = (props: Props) => {
	return (
		<MainFrame>
			<TopScreen>
				<h1>2nd node</h1>
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
