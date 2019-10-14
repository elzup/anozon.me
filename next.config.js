require('dotenv').config()
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const path = require('path')
const Dotenv = require('dotenv-webpack')
const dist = __dirname + '/dist'

module.exports = {
	'/': { page: '/' },
	webpack: config => {
		config.plugins.push(
			new WorkboxWebpackPlugin.GenerateSW({
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
