// @flow
import * as React from 'react'
import styled from 'styled-components'

import Screen from '../Screen'
import anozonFace from './anozon-icon.svg'
import anozonLogo from './launcher-icon.svg'

type Props = {}

const Body = styled.div`
	text-align: center;
`

const NameBox = styled.div`
	display: flex;
	justify-content: center;
`
const Name = styled.h3`
	font-size: 35px;
	background: #eee;
	border: double #ddd;
	padding: 0 1.5em;
`

const ImagesCol = styled.div`
	display: flex;
	justify-content: center;
	> img {
		margin: 0 5px;
		width: 140px;
		height: 140px;
		border: solid 5px #dcdcdc;
		border-radius: 50%;
	}
`

const ProfileScreen = (props: Props) => {
	return (
		<Screen id="profile" title="Profile" description="自己紹介">
			<Body>
				<ImagesCol>
					<img src={anozonFace} alt="anozon icon" />
					<img src={anozonLogo} alt="anozon logo" />
				</ImagesCol>
				<NameBox>
					<Name>anozon</Name>
				</NameBox>
				<p>「あのぞん」と読む。</p>
				<p>ある2つのモノのインフラを作るために現れた。</p>
				<p>未来を想像するのが好き。</p>
			</Body>
		</Screen>
	)
}

export default ProfileScreen
