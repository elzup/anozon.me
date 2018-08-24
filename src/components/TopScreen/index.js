// @flow
import * as React from 'react'
import styled from 'styled-components'

import Menu from '../Menu'
import Links from '../Links'
import { Decoration } from './Decoration'

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
	display: flex;
	flex-direction: column;
`

const EyeCatch = styled.div`
	flex: 1;
`
const TopScreen = (props: Props) => {
	return (
		<Wrapper>
			<Decoration />
			<Content>
				<EyeCatch>
					<h1>new node</h1>
				</EyeCatch>
				<Menu />
				<Links />
			</Content>
		</Wrapper>
	)
}

export default TopScreen
