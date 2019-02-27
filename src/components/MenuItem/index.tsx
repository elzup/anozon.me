import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import Scrollchor from 'react-scrollchor'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const invert = keyframes`
0% {
	background: white;
	color: black;
}

100% {
	background: black;
	color: white;
}
`

const A = styled(Scrollchor)`
	display: flex;
	padding: 5px;
	margin: 0 5px;
	font-size: 40px;
	width: 20vw;
	border-bottom: dashed;
	justify-content: center;
	border-radius: 5px;
	@media (max-width: 700px) {
		width: auto;
	}
	&:hover {
		animation: ${invert} 0.6s ease 0s forwards;
	}
`
const Button = styled.div`
	margin-left: 5px;
`

type Props = {
	href: string
	label: string
	icon: IconProp
}

const MenuItem = (props: Props) => {
	return (
		<A to={props.href} animate={{ offset: 20, duration: 400 }}>
			<FontAwesomeIcon icon={props.icon} />
			<Button>{props.label}</Button>
		</A>
	)
}

export default MenuItem
