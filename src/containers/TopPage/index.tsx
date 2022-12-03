import styled from 'styled-components'
import Footer from '../../components/Footer'
import HobbyScreen from '../../components/HobbyScreen'
import ProfileScreen from '../../components/ProfileScreen'
import TopScreen from '../../components/TopScreen'
import WorkScreen from '../../components/WorkScreen'

const MainFrame = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: 100vmin;
	min-height: 100vmin;
`

const SecondScreen = styled.div`
	position: absolute;
	z-index: -2;
	left: 0;
	top: 100%;
	width: 100%;
	background: linear-gradient(white 0%, #e6e6e6 100%);
`

const TopPage = () => (
	<MainFrame>
		<TopScreen />
		<SecondScreen>
			<ProfileScreen />
			<WorkScreen />
			<HobbyScreen />
			<Footer />
		</SecondScreen>
	</MainFrame>
)

export default TopPage
