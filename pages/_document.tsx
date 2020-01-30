import React, { ElementType } from 'react'

import { GA_TRACKING_ID } from '../src/utils/gtag'

const config = {
	url: 'https://anozon.me',
	title: "anozon's site",
	description: 'about anozon. web programmer, my hobbies: game, puzzle.',
	image: 'https://anozon.me/static/another-node.png',
	twitter: '@anozon',
}

type DocumentProps = {
	Main: ElementType
	Head: ElementType
	NextScript: ElementType
}

export default function Document({ Main, Head, NextScript }: DocumentProps) {
	return (
		<html lang="ja">
			<Head>
				<title>{config.title}</title>
				<link rel="shortcut icon" href="icon.png" />
				<link rel="icon" type="image/png" href="icon.png" sizes="192x192" />

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
		</html>
	)
}
