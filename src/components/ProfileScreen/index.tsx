import styled from 'styled-components'

import Screen from '../Screen'

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
					<img src="/static/anozon-icon.svg" alt="anozon icon" />
					<img src="/static/anozon-cat.png" alt="anozon cat icon" />
					<img src="/static/launcher-icon.svg" alt="anozon logo" />
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
