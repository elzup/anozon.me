import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import reducer from './reducer'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['LoginForm'],
}

export default () => {
	const middleware = [thunk]
	const enhancers = [] as any

	const devtool = (window as any).__REDUX_DEVTOOLS_EXTENSION__
	if (process.env.NODE_ENV === 'development') {
		if (typeof devtool === 'function') {
			enhancers.push(devtool())
		}
	}

	const composer = compose(
		applyMiddleware(...middleware),
		...enhancers
	)

	const persistedReducer = persistReducer(persistConfig, reducer)
	const store = createStore(persistedReducer, composer)
	const persistor = persistStore(store)
	return { store, persistor }
}
