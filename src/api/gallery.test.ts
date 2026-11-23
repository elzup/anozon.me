import { describe, expect, it } from 'vitest'
import type { Product } from '../types'
import { productImages } from './gallery'

const product = (over: Partial<Product> = {}): Product => ({
	title: 'quota',
	url: '',
	urlLive: false,
	description: '',
	filename: 'quota.png',
	tags: [],
	size: 'M',
	hasImage: true,
	...over,
})

describe('productImages', () => {
	it('gallery に画像が無ければメイン画像だけ', () => {
		expect(productImages(product(), ['gallery/other/01.png', 'tumblr/1-0.webp'])).toEqual(['/static/quota.png'])
	})

	it('メイン画像の後ろに gallery/<拡張子なし>/ の画像を名前順で続ける', () => {
		const keys = ['gallery/quota/02.png', 'gallery/quota/01.jpg', 'gallery/quota/memo.txt', 'gallery/quotas/01.png']

		expect(productImages(product(), keys)).toEqual([
			'/static/quota.png',
			'/static/gallery/quota/01.jpg',
			'/static/gallery/quota/02.png',
		])
	})

	it('サブフォルダの画像は含めない', () => {
		expect(productImages(product(), ['gallery/quota/old/01.png'])).toEqual(['/static/quota.png'])
	})

	it('hasImage: false ならメイン画像は含めない', () => {
		expect(productImages(product({ hasImage: false }), ['gallery/quota/01.png'])).toEqual([
			'/static/gallery/quota/01.png',
		])
	})
})
