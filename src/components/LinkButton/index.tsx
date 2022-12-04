import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { keyframes } from 'styled-components'

const hilight = keyframes`
from {
	box-shadow: 1px 1px;
}

to {
	box-shadow: 1px 1px #aaa;
	background: #cdcdcd;
}
`

const Body = styled.div`
	background: #fff;
	box-shadow: 1px 1px;
	display: inline-flex;
	margin-top: 5px;
	// font-size: 0.8em;
	&:hover {
		animation: ${hilight} 0.5s ease 0s forwards;
	}
`

const Label = styled.div`
	padding: 5px;
`

const Icon = styled.div`
	padding: 5px;
	background: black;
	width: 1em;
	text-align: center;
`

type Props = { href: string; text?: string }

const getIcon = (url: string): IconProp => {
	if (url.search('github') >= 0) {
		return ['fab', 'github']
	} else if (url.search('tumblr') >= 0) {
		return ['fab', 'tumblr']
		// } else if (url.search('annict') >= 0) {
		// 	return 'annict'
	} else {
		return 'arrow-circle-right'
	}
}

const LinkButton = (props: Props) => {
	const icon = getIcon(props.href)

	return (
		<a
			href={props.href}
			aria-label={props.text}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div>
				<Body>
					{props.text && <Label>{props.text}</Label>}
					<Icon>
						<FontAwesomeIcon icon={icon} inverse />
					</Icon>
				</Body>
			</div>
		</a>
	)
}

export default LinkButton
