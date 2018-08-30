// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {}

const Panel = styled.div`
	height 50vh;
	width: 100%;
	background: black;
	display: flex;
	justify-content: center;
`
const Another = styled.div`
	line-height: 50vh;
	color: transparent;
	font-size: 25vw;
	font-weight: 900;
	text-shadow: 0 0 200px white;
	transform: rotate(180deg);
`

const Footer = (props: Props) => (
	<Panel>
		<Another>anozon</Another>
	</Panel>
)

export default Footer
