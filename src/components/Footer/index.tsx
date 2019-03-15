import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { cssDoodle } from '../../utils'

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
	z-index: 10;
	padding: 8px 16px;
	align-items: flex-end;
	justify-content: flex-end;
`

const CopyRight = styled.h4`
	color: white;
`

const DoodleBackground = cssDoodle`
  :doodle {
		@grid: 5x9;
		width: 100%;
		height: 10em;
		z-index: 1;
		position: absolute;
	}

	color: #ddd;
	margin: 4px;


	--d: 5;
	--r: 3;
	--num: calc(
		@abs(@abs(@row() - 3) + @abs(@col() - 3) - 5) / 5
	);
	
	background: hsla(
		0, 0%, 100%, calc(var(--num) / 5)
	);

  :hover { 
		transform: rotate(90deg);
	}
`

const Footer = (props: Props) => (
	<Panel>
		<DoodleBackground style={{}} />
		<Contents>
			<CopyRight>© 2019 anozon</CopyRight>
		</Contents>
	</Panel>
)

export default Footer
