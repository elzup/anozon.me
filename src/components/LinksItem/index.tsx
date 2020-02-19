import styled, { keyframes } from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const spin = keyframes`
50% {
	background: #444;
	transform: rotateZ(-10deg);
}

100% {
	background: black;
	transform: rotateZ(0deg);
}
`

const A = styled.a`
	position: relative;
	height: 45px;
	width: 45px;
	border-radius: 5px;
	background: black;
	font-size: 30px;
	line-height: 47px;
	margin: 5px;
	&:hover {
		animation: ${spin} 0.3s ease 0s forwards;
	}
`

const Box = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	text-align: center;
	color: white;
`

export type Props = {
	title: string
	href: string
	icon: IconProp
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
