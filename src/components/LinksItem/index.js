// @flow
import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const A = styled.a`
	position: relative;
	height: 45px;
	width: 45px;
	border-radius: 5px;
	background: black;
	font-size: 30px;
	line-height: 47px;
	margin: 5px;
`

const Box = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	text-align: center;
	color: white;
`

export type Props = {
	title: string,
	href: string,
	icon: string | string[],
}

const LinksItem = (props: Props) => (
	<A
		title={props.title}
		href={props.href}
		target="_blank"
		rel="noopener noreferrer"
	>
		<Box>
			<FontAwesomeIcon icon={props.icon} />
		</Box>
	</A>
)

export default LinksItem
