import Image from 'next/image'
import styled from 'styled-components'

import Screen from '../Screen'
import anozonOldPic from './img/anozon-icon.svg'
import anozonCatPic from './img/anozon_cat.png'
import anozonLaufrom from './img/launcher-icon.svg'

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

// array random sample
const sample = <T extends string | unknown[]>(a: T): T[0] =>
	a[Math.floor(Math.random() * a.length)]
const dadedo = sample('だでど')

const ProfileScreen = () => {
	return (
		<Screen id="profile" title="Profile" description="自己紹介">
			<Body>
				<ImagesCol>
					<Image src={anozonOldPic} alt="anozon icon" />
					<Image src={anozonCatPic} alt="anozon cat icon" />
					<Image src={anozonLaufrom} alt="anozon logo" />
				</ImagesCol>
				<NameBox>
					<Name>anozon</Name>
				</NameBox>
				<p>「あのぞん」{dadedo}す。</p>
				<p>ある2つのモノのインフラを作るために現れた。</p>
				<p>未来を想像するのが好き。</p>
			</Body>
		</Screen>
	)
}

export default ProfileScreen
