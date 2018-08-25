// @flow

import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Label = styled.span`
	margin-right: 5px;
`

const Body = styled.div`
	margin: 2px;
	border: solid 1px #d6d6d6;
	background: #efefef;
	padding: 5px;
	float: left;
	box-shadow: 3px 3px;
`

type Props = { href: string, text: string }

const LinkButton = (props: Props) => {
	return (
		<a href={props.href} target="_blank" rel="noopener noreferrer">
			<Body>
				<Label>{props.text}</Label>
				<FontAwesomeIcon transform={{ rotate: 45 }} icon={'arrow-circle-up'} />
			</Body>
		</a>
	)
}

export default LinkButton
