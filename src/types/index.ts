export type ProductSize = 'XS' | 'S' | 'M' | 'L'

export type ImageFit = 'cover' | 'contain'

export type ProductKind = 'app' | 'package' | 'vscode-extension'

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
	imageFit?: ImageFit
	/** 'package' はターミナル風の特殊カードで表示する (npm module / CLI) */
	kind?: ProductKind
	npmUrl?: string
	marketplaceUrl?: string
	/** install コマンド表示・npm 系カードで使う実パッケージ名 */
	packageName?: string
	/** VS Code Marketplace の extension ID */
	extensionId?: string
	/** true の作品は Works 一覧に表示しない (データは残す非公開扱い) */
	hidden?: boolean
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
