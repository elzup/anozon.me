import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'

import { GA_TRACKING_ID } from '../config'
import * as gtag from '../utils/gtag'

const config = {
	url: 'https://anozon.me',
	title: "anozon's site",
	description: 'about anozon. web programmer, my hobbies: game, puzzle.',
	image: 'https://anozon.me/static/another-node.png',
	twitter: '@anozon',
}

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))
const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>{config.title}</title>
			<link rel="shortcut icon" href="/static/launcher-icon-4x.png" />
			<link
				rel="icon"
				type="image/png"
				href="/static/launcher-icon-4x.png"
				sizes="192x192"
			/>
			<meta name="description" content={config.description} />
			<meta property="og:url" content={config.url} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={config.title} />
			<meta property="og:description" content={config.description} />
			<meta property="og:site_name" content={config.title} />
			<meta property="og:image" content={config.image} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@anozon" />
			<meta name="theme-color" content="#eee" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			{/* NOTE: https://github.com/vercel/next.js/issues/26160 */}
			{/* eslint-disable-next-line @next/next/no-page-custom-font */}
			<link
				href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap"
				rel="stylesheet"
			/>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
