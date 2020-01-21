import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../src/utils/gtag'

export default class extends Document {
	render() {
		return (
			<html lang="ja">
				<Head>
					<meta name="theme-color" content="#eee" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
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
			</html>
		)
	}
}
