const webpack = require('webpack')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const dist = __dirname + '/dist'

const config = {
	webpack: (config) => {
		config.plugins.push(
			new WorkboxWebpackPlugin.GenerateSW({
				maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
				swDest: dist + '/sw.js',
				clientsClaim: true,
				skipWaiting: true,
			})
		)

		return config
	},
}

module.exports = withBundleAnalyzer(config)
