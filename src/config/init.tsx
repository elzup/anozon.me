import { config as faConfig, library } from '@fortawesome/fontawesome-svg-core'
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
