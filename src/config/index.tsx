let { NODE_ENV, REACT_APP_GA } = process.env

const isDev = NODE_ENV === 'development'

const configDevelopment = {}
const configProduction = {}

const config = {
	isDev,
	ga: REACT_APP_GA || '',
	api: {
		url: '',
	},
	...(isDev ? configDevelopment : configProduction),
}

export default config
