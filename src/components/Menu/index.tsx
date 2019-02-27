import * as React from 'react'
import styled from 'styled-components'
import MenuItem from '../MenuItem'

type Props = {}

const Wrapper = styled.section`
	margin: 10px 0;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`

const Menu = (props: Props) => {
	return (
		<Wrapper>
			<MenuItem href="#profile" label="Profile" icon="coffee" />
			<MenuItem href="#work" label="Work" icon="palette" />
			<MenuItem href="#hobby" label="Hobby" icon="gamepad" />
		</Wrapper>
	)
}

export default Menu
