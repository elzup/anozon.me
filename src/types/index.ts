export type Product = {
	title: string
	url: string
	urlLive: boolean
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
