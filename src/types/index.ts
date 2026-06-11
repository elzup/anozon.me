export type ProductSize = 'XS' | 'S' | 'M' | 'L'

export type ImageLayout = 'stack' | 'split'

export type Product = {
	title: string
	url: string
	urlLive: boolean
	githubUrl?: string
	description: string
	filename: string
	iconFilename?: string
	tags: string[]
	size: ProductSize
	hasImage: boolean
	imageLayout?: ImageLayout
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
