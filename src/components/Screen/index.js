// @flow
import * as React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
	margin: 5vh auto 0;
	padding: 10px;
	width: 650px;
`

const Title = styled.h2`
	text-align: center;
	border-bottom: solid 1px gray;
	width: 100%;
	&:before {
		content: '-';
	}
	&:after {
		content: '-';
	}
`

const Header = styled.div`
	display: flex;
	justify-content: center;
`

type Props = {
	id: string,
	title: string,
	description: string,
	children?: React.Node,
}

const Screen = (props: Props) => (
	<Wrapper id={props.id}>
		<Header>
			<Title>
				{props.title}: {props.description}
			</Title>
		</Header>
		{props.children}
	</Wrapper>
)

export default Screen
