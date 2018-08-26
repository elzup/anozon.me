// @flow

import * as React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const A = styled.a`
	display: flex;
	padding: 5px;
	margin: 0 5px;
	font-size: 40px;
	width: 20vw;
	border-bottom: dashed;
	justify-content: center;
	@media (max-width: 700px) {
		width: auto;
	}
`
const Button = styled.div`
	margin-left: 5px;
`

type Props = {
	href: string,
	label: string,
	icon: string,
}

const MenuItem = (props: Props) => {
	return (
		<A href={props.href}>
			<FontAwesomeIcon icon={props.icon} />
			<Button>{props.label}</Button>
		</A>
	)
}

export default MenuItem
