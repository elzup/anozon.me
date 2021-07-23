import { createGlobalStyle } from 'styled-components'
import {
	config as faConfig,
	dom,
	library,
} from '@fortawesome/fontawesome-svg-core'

import ReactGA from 'react-ga'

import {
	faPenNib,
	faPalette,
	faGift,
	faGamepad,
	faCoffee,
	faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import {
	faTwitter,
	faGithub,
	faYoutube,
	faTumblr,
} from '@fortawesome/free-brands-svg-icons'
import config, { GA_TRACKING_ID } from '.'

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

export const GlobalStyle = createGlobalStyle`

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

if (!config.isDev) {
	ReactGA.initialize(GA_TRACKING_ID)
	ReactGA.pageview('/')
}
