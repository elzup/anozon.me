// @flow
import type { State as AuthContainer } from '../containers/AuthContainer/reducer'
import type { State as FormContainer } from '../containers/FormContainer/reducer'
import type { State as HouseById } from '../containers/HouseById/reducer'
import type { State as HouseContainer } from '../containers/HouseContainer/reducer'
import type { State as LogContainer } from '../containers/LogContainer/reducer'
import type { State as Network } from '../containers/Network/reducer'
import type { State as SettingContainer } from '../containers/SettingContainer/reducer'

export type State = {
	AuthContainer: AuthContainer,
	FormContainer: FormContainer,
	HouseById: HouseById,
	HouseContainer: HouseContainer,
	LogContainer: LogContainer,
	Network: Network,
	SettingContainer: SettingContainer,
}
