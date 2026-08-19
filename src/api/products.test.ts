import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { products } from './products'

// 画像・リンクは products.ts が唯一の一次ソースなので、
// ビルドが通っても 404 になる類のズレをここで止める
const staticPath = (filename: string) => `public/static/${filename}`

describe('products データ整合性', () => {
	it('タイトルが重複しない', async () => {
		const titles = products.map((product) => product.title)

		expect(titles).toEqual([...new Set(titles)])
	})

	it('hasImage の作品は実在する画像を指す', () => {
		const missing = products
			.filter((product) => product.hasImage)
			.filter((product) => !product.filename || !existsSync(staticPath(product.filename)))
			.map((product) => product.title)

		expect(missing).toEqual([])
	})

	it('iconFilename は実在する画像を指す', () => {
		const missing = products
			.filter((product) => product.iconFilename)
			.filter((product) => !existsSync(staticPath(product.iconFilename as string)))
			.map((product) => product.title)

		expect(missing).toEqual([])
	})

	it('公開中の URL は絶対 URL になっている', () => {
		const invalid = products
			.filter((product) => product.urlLive)
			.filter((product) => !/^https?:\/\//.test(product.url))
			.map((product) => product.title)

		expect(invalid).toEqual([])
	})

	it('package は npm リンクを持つ', () => {
		const missing = products
			.filter((product) => product.kind === 'package' && !product.npmUrl)
			.map((product) => product.title)

		expect(missing).toEqual([])
	})

	it('vscode-extension は Marketplace リンクを持つ', () => {
		const missing = products
			.filter((product) => product.kind === 'vscode-extension' && !product.marketplaceUrl)
			.map((product) => product.title)

		expect(missing).toEqual([])
	})
})
