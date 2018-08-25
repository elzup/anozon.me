// @flow
import * as React from 'react'
import styled from 'styled-components'

import Menu from '../Menu'
import Links from '../Links'
import { Decoration } from './Decoration'

import eyeCatch from './eyecatch.png'

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
	border-radius: 10%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`

const EyeCatch = styled.div`
	flex: 4;
	display: flex;
	width: 100%;
	justify-content: center;
`
const ImageDiv = styled.div`
	width: 100%;
	height: auto;
	background-image: url(${eyeCatch});
	background-position: center;
	background-repeat: no-repeat;
	object-fit: contain;
`

const TopScreen = (props: Props) => {
	return (
		<Wrapper>
			<Decoration />
			<Content>
				<EyeCatch>
					<ImageDiv alt="Another Node - anozon" />
				</EyeCatch>
				<Menu />
				<Links />
			</Content>
		</Wrapper>
	)
}

export default TopScreen
