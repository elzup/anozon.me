// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { Action as _Action } from './action'
import type { State as _State } from './state'

type RehydrateAction = {
	type: 'persist/REHYDRATE',
	payload: _State,
}

export type State = _State
export type Action = _Action | RehydrateAction

export type Reducer = (state: State, action: Action) => State
export type Reducers = {
	[key: string]: Reducer,
}

export type GetState = () => State

export type ThunkAction = (
	dispatch: ReduxDispatch<*>,
	getState: GetState,
) => void | Promise<void>

type ThunkDispatch<A> = (ta: ThunkAction) => A

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
export type Store = ReduxStore<State, Action, Dispatch>

export type Auth = {
	authorized: boolean,
	accessToken: string,
	email: string,
	authLoading: boolean,
}

export type ID = string | number

export type Entity = {
	id: ID,
	createdAt: string,
}

export type Sensor = { id: number, label: string, unit: string }

export type AuthResponse = {
	id: 1,
	email: string,
	accessToken: string,
} & Entity

export type Log = {
	tmp: number,
	hmd: number,
	co2: number,
	psr: number,
	vpd: number,
	houseId: ID,
} & Entity

export type DayLogById = {
	logs: Log[],
	tempMax: number,
	tempMin: number,
}

export type SubControlField = {
	name: string,
	rate: number,
	controlId: ID,
}

export type SubControl = {
	label: string,
	name: string,
	rate: number,
	controlId: ID,
} & Entity

export type Control = {
	houseId: ID,
	label: string,
	activePin: number,
	negativePin: number,
	activePinView: string | null,
	negativePinView: string | null,
	timer: number,
	isHit: boolean,
	subControls: SubControl[],
	isNew: false,
} & Entity

export type ControlNew = Entity & {
	id: null,
	houseId: ID,
	label: string,
	activePin: number,
	negativePin: number,
	activePinView: string | null,
	negativePinView: string | null,
	timer: number,
	isNew: true,
}

export type ControlField = Control | ControlNew

export type Trigger = {
	houseId: ID,
	sensor: number,
	high: ?number,
	low: ?number,
	label: string,
} & Entity

export type FarmEvent = {
	triggerId: ?ID,
	scenarioId: ID,
	controlId: ID,
	subControlId: ID,
	enabled: boolean,
	activeInterval: number | null,
	negativeInterval: number | null,
	startTime: string,
	endTime: string,
} & Entity

export type FarmEventFull = FarmEvent & {
	trigger: ?Trigger,
	subControl: SubControl,
}

export type Scenario = {
	houseId: ID,
	name: string,
	events: FarmEvent[],
	isActive: boolean,
	isNew: false,
} & Entity

export type ScenarioNew = Entity & {
	id: null,
	houseId: ID,
	name: string,
	isNew: true,
}

export type ScenarioField = Scenario | ScenarioNew

export type AppConfig = {
	editScenario: boolean,
	editControl: boolean,
	editTrigger: boolean,
	editEvent: boolean,
}

export type Form = {}

export type House = {
	name: string,
	controls: Control[],
	triggers: Trigger[],
	scenarios: Scenario[],
	activeScenarioId: ID,
	pin: number,
	lastLog: Log,
	isActive: boolean,
} & Entity
