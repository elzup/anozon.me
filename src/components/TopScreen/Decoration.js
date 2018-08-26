import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const circleShow = keyframes`
0% {
	top: 50%; left: 50%;
	width: 0; height: 0;
	opacity: 1;
}

100% {
	top: calc(50% - 90vmax / 2);
	left: calc(50% - 90vmax / 2);
	opacity: 1;
	width: 90vmax;
	height: 90vmax;
}
`

const Circle = styled.div`
	position: absolute;
	border: solid black 1px;
	border-radius: 50%;
	opacity: 0;
	background: white;
	width: 0;
	height: 0;
	animation: ${circleShow} 1s ease 4s forwards;
`

const DecoWrap = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
`

const coverShow = keyframes`
0% {
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
}

100% {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
`

const coverClose = keyframes`
0% {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
100% {
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
}

`

const Cover = styled.div`
	position: absolute;
	background: black;
	animation: ${coverShow} 1s ease 0s forwards, ${coverClose} 1s ease 4s forwards;
`

export const Decoration = () => (
	<DecoWrap>
		<Cover />
		<Circle />
	</DecoWrap>
)
