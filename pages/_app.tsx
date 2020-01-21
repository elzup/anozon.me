import App, { Container } from 'next/app'
import Router from 'next/router'
import { NextSeo } from 'next-seo'

import * as gtag from '../src/utils/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default class MyApp extends App {
	render() {
		return (
			<Container>
				<NextSeo
					title="anozon's site"
					description="about anozon. web programmer, my hobbies: game, puzzle."
					openGraph={{
						url: 'https://anozon.me',
						images: [
							{
								url: 'https://anozon.me/static/another-node.png',
								alt: 'anozon site',
							},
						],
						// eslint-disable-next-line @typescript-eslint/camelcase
						site_name: "anozon's site",
					}}
					twitter={{
						handle: '@anozon',
						site: '@anozon',
						cardType: 'summary_large_image',
					}}
				/>
			</Container>
		)
	}
}
