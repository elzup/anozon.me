const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const config = {
	swcMinify: true,
}

module.exports = withBundleAnalyzer(config)
