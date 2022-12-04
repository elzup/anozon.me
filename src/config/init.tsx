import {
	config as faConfig,
	dom,
	library,
} from '@fortawesome/fontawesome-svg-core'
import {
	faGithub,
	faTumblr,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import {
	faArrowCircleRight,
	faCoffee,
	faGamepad,
	faGift,
	faPalette,
	faPenNib,
} from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga'
import { createGlobalStyle } from 'styled-components'
import { GA_TRACKING_ID, isDev } from '.'

library.add(
	faPenNib,
	faPalette,
	faGift,
	faGamepad,
	faCoffee,
	faArrowCircleRight,
	faTwitter,
	faGithub,
	faYoutube,
	faTumblr
)

faConfig.autoAddCss = false

export const GlobalStyle: any = createGlobalStyle`

	* {
		font-family: 'M PLUS Rounded 1c', sans-serif;
	}

  body {
    margin: 0;
  }

	a {
		color: black;
		text-decoration: none;
	}
	${dom.css()}
`

if (!isDev) {
	ReactGA.initialize(GA_TRACKING_ID)
	ReactGA.pageview('/')
}
