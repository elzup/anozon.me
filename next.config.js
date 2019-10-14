require('dotenv').config()
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const path = require('path')
const Dotenv = require('dotenv-webpack')
const dist = __dirname + '/out'

module.exports = {
	'/': { page: '/' },
	webpack: config => {
		config.plugins.push(
			new WorkboxWebpackPlugin.GenerateSW({
				globDirectory: dist,
				globPatterns: [
					'*.{html,js,css}',
					'static/**/*.{jpg,jpeg,png,gif,webp,svg}',
				],
				swDest: dist + '/sw.js',
				clientsClaim: true,
				skipWaiting: true,
			})
		)

		config.plugins.push(
			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true,
			})
		)

		return config
	},
}
