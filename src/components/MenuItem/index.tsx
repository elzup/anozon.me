import styled, { keyframes } from 'styled-components'
import { Link } from 'react-scroll'

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

const A = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	margin: 0 5px;
	font-size: 40px;
	width: 20vw;
	border-bottom: dashed;
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

// <div animate={{ offset: 20, duration: 400 }}>
const MenuItem = ({ href, label, icon }: Props) => {
	return (
		<A to={href} duration={500} smooth>
			<FontAwesomeIcon icon={icon} />
			<Button>{label}</Button>
		</A>
	)
}

export default MenuItem
