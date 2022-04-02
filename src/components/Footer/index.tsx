import styled from 'styled-components'

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

const Footer = () => (
	<Panel>
		<Contents>
			<CopyRight>© 2020 anozon</CopyRight>
		</Contents>
	</Panel>
)

export default Footer
