const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const config = {}

module.exports = withBundleAnalyzer(config)
