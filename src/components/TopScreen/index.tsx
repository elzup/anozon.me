import * as React from 'react'
import styled, { keyframes } from 'styled-components'

import Menu from '../Menu'
import Links from '../Links'
import { Decoration } from './Decoration'

const show = keyframes`
0% {
	opacity: 0;
}

100% {
	opacity: 1;
}
`

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
	border-radius: 10%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	opacity: 0;
	animation: ${show} 1s ease 1s forwards;
`

const EyeCatch = styled.div`
	flex: 4;
	display: flex;
	width: 100vmin;
	justify-content: center;
`
const ImageDiv = styled.div`
	width: 100vmin;
	height: auto;
	background-image: url(static/eyecatch.svg);
	background-position: center;
	background-size: 95% auto;
	background-repeat: no-repeat;
	object-fit: contain;
`

const TopScreen = () => {
	return (
		<Wrapper>
			<Decoration />
			<Content>
				<EyeCatch>
					<ImageDiv title="Another Node - anozon" />
				</EyeCatch>
				<Menu />
				<Links />
			</Content>
		</Wrapper>
	)
}

export default TopScreen
