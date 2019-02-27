import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import '../src/config/init'
import styled from 'styled-components'

import LinkButton from '../src/components/LinkButton'
const Screen = styled.div`
	width: 360px;
	min-height: 732px;
	border: solid gray 3px;
`

storiesOf('LinkButton', module)
	.add('normal', () => (
		<Screen>
			<LinkButton href="https://elzup.com" text="Hello" />
			<LinkButton href="https://elzup.com" text="日本語" />
		</Screen>
	))
	.add('no text', () => (
		<Screen>
			<LinkButton href="https://elzup.com" />
		</Screen>
	))
	.add('social', () => (
		<Screen>
			<LinkButton href="https://annict.jp" text="annict" />
			<LinkButton href="http://elzup.tumblr.com/hoge" text="tumblr" />
			<LinkButton href="http://github.com/elzup/anozon.me" text="github" />
		</Screen>
	))
