import * as React from 'react'
import styled, { withTheme } from 'styled-components'

type Props = {}

const Panel = styled.div`
	height: 10em;
	width: 100%;
	background: black;
	display: flex;
	justify-content: center;
`

const Contents = styled.div`
	display: flex;
	width: 100%;
	padding: 8px;
	align-items: flex-end;
	justify-content: flex-end;
`

const CopyRight = styled.h4`
	color: white;
`

const Footer = (props: Props) => (
	<Panel>
		<Contents>
			<CopyRight>© 2019 anozon</CopyRight>
		</Contents>
	</Panel>
)

export default Footer
