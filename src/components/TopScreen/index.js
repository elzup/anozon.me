// @flow
import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {}

const Wrapper = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
`

const Content = styled.div`
	position: absolute;
	left: calc(50% - 50vmin);
	top: calc(50% - 50vmin);
	width: 100vmin;
	height: 100vmin;
	background-color: #aaa;
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

const TopScreen = (props: Props) => {
	return (
		<Wrapper>
			<Decoration />
			<Content>
				<div>
					<h1>new node</h1>
				</div>
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
			</Content>
		</Wrapper>
	)
}

export default TopScreen
