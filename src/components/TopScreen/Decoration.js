import * as React from 'react'
import styled from 'styled-components'

const Circle = styled.div`
	position: absolute;
	top: calc(50% - 90vmax / 2);
	left: calc(50% - 90vmax / 2);
	width: 90vmax;
	height: 90vmax;
	border: solid black 1px;
	border-radius: 50%;
`

const DecoWrap = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
`

export const Decoration = () => (
	<DecoWrap>
		<Circle />
	</DecoWrap>
)
