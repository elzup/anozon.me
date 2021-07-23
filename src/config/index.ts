const isDev = process.env.NODE_ENV === 'development'

const configDevelopment = {}
const configProduction = {}

export const GA_TRACKING_ID = 'ua-49286104-9'
const config = {
	isDev,
	...(isDev ? configDevelopment : configProduction),
}

export default config
