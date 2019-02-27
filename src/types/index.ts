import { AnyAction } from 'redux'
import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { State as _State } from './state'

export type State = _State

export type GetState = () => State

export type ThunkAction = _ThunkAction<
	void | Promise<void>,
	State,
	undefined,
	AnyAction
>

export type System = {}

export type Product = {
	title: string
	url: string
	description: string
	filename: string
	tags: string[]
}

export type HobbyNote = {
	href?: string
	text: string
}

export type Hobby = {
	name: string
	notes?: HobbyNote[]
}

export type Category = {
	name: string
	hobbies: Hobby[]
}

export type HobbyImage = {
	src: string
	href: string
}
