const isDev = process.env.NODE_ENV === 'development'

const configDevelopment = {}
const configProduction = {}

const config = {
	isDev,
	ga: process.env.REACT_APP_GA || '',
	...(isDev ? configDevelopment : configProduction),
}

export default config
