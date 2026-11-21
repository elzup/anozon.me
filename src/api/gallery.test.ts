import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
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

const galleryWith = (key: string, files: string[]) => {
	const root = mkdtempSync(join(tmpdir(), 'gallery-'))
	mkdirSync(join(root, key))
	files.forEach((name) => writeFileSync(join(root, key, name), ''))
	return root
}

describe('productImages', () => {
	it('gallery フォルダが無ければメイン画像だけ', () => {
		expect(productImages(product(), join(tmpdir(), 'no-such-gallery'))).toEqual(['/static/quota.png'])
	})

	it('メイン画像の後ろに gallery/<拡張子なし>/ の画像を名前順で続ける', () => {
		const root = galleryWith('quota', ['02.png', '01.jpg', 'memo.txt'])

		expect(productImages(product(), root)).toEqual([
			'/static/quota.png',
			'/static/gallery/quota/01.jpg',
			'/static/gallery/quota/02.png',
		])
	})

	it('hasImage: false ならメイン画像は含めない', () => {
		const root = galleryWith('quota', ['01.png'])

		expect(productImages(product({ hasImage: false }), root)).toEqual(['/static/gallery/quota/01.png'])
	})
})
