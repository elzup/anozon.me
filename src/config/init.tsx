import { createGlobalStyle } from 'styled-components'
import ReactGA from 'react-ga'

// import 'moment/locale/ja'

import { library } from '@fortawesome/fontawesome-svg-core'
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
import config from '.'

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

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Operator Mono';
    src: url('../fonts/Operator-Mono.ttf');
  }

  body {
    margin: 0;
  }

	a {
		color: black;
		text-decoration: none;
	}
`

if (!config.isDev) {
	ReactGA.initialize(config.ga)
	ReactGA.pageview(window.location.pathname + window.location.search)
}
