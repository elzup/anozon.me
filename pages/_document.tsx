import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

import { GA_TRACKING_ID } from '../src/utils/gtag'

const config = {
	url: 'https://anozon.me',
	title: "anozon's site",
	description: 'about anozon. web programmer, my hobbies: game, puzzle.',
	image: 'https://anozon.me/static/another-node.png',
	twitter: '@anozon',
}

class Document extends NextDocument {
	static async getInitialProps(ctx) {
		const sheet = new StyledComponentSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await NextDocument.getInitialProps(ctx)

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}
	render() {
		return (
			<Html lang="ja">
				<title>{config.title}</title>
				<Head>
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
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
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
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default Document
