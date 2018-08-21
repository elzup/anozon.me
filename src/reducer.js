// @flow
import { combineReducers } from './config'
import AuthContainer from './containers/AuthContainer/reducer'
import FormContainer from './containers/FormContainer/reducer'
import HouseById from './containers/HouseById/reducer'
import HouseContainer from './containers/HouseContainer/reducer'
import LogContainer from './containers/LogContainer/reducer'
import Network from './containers/Network/reducer'
import SettingContainer from './containers/SettingContainer/reducer'

export default combineReducers({
	AuthContainer,
	FormContainer,
	HouseById,
	HouseContainer,
	LogContainer,
	Network,
	SettingContainer,
})
