require('dotenv').config()
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const path = require('path')
const dist = __dirname + '/dist'

module.exports = {
	'/': { page: '/' },
	webpack: config => {
		const env = Object.keys(process.env).reduce((acc, curr) => {
			acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
			return acc
		}, {})
		config.plugins.push(new webpack.DefinePlugin(env))
		config.plugins.push(
			new WorkboxWebpackPlugin.GenerateSW({
				swDest: dist + '/sw.js',
				clientsClaim: true,
				skipWaiting: true,
			})
		)

		return config
	},
}
