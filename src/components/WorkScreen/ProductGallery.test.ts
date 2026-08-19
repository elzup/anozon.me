import { describe, expect, it } from 'vitest'
import { products } from '../../api/data'
import type { ProductSize } from '../../types'
import { renderFragment, renderNormalizedHtml } from '../../test/render'
import ProductGallery from './ProductGallery.astro'

const gallery = () => renderFragment(ProductGallery)

const visibleProducts = products.filter((product) => !product.hidden)
const sizeOf = (size?: ProductSize) => size ?? 'M'

describe('ProductGallery', () => {
	it('hidden の作品は 1 件も出さない', async () => {
		const el = await gallery()
		const titles = [...el.querySelectorAll('.card-wrapper h4')].map((h) => h.textContent)

		for (const product of products.filter((p) => p.hidden)) {
			expect(titles).not.toContain(product.title)
		}
		expect(titles).toHaveLength(visibleProducts.length)
	})

	it('セクションを L → M → S → XS の順に並べる', async () => {
		const el = await gallery()
		const grids = [...el.querySelectorAll('.sec .grid')].map(
			(grid) => [...grid.classList].find((name) => name.startsWith('grid-'))
		)
		const expected = (['L', 'M', 'S', 'XS'] as ProductSize[])
			.filter((size) => visibleProducts.some((p) => sizeOf(p.size) === size))
			.map((size) => `grid-${size}`)

		expect(grids).toEqual(expected)
	})

	it('該当作品が無いサイズのセクションは描画しない', async () => {
		const el = await gallery()

		for (const section of el.querySelectorAll('.sec')) {
			expect(section.querySelectorAll('.card-wrapper').length).toBeGreaterThan(0)
		}
	})

	// 個別の assert が拾わない構造変化 (カードの並び順、意図しない要素の増減) を
	// 一覧まるごとで押さえる。products.ts の増減でも差分が出るので、
	// 作品追加時は差分を目視してから -u する
	it('一覧全体の構造が変わっていない', async () => {
		expect(await renderNormalizedHtml(ProductGallery)).toMatchSnapshot()
	})

	it('各カードを自身の size のセクションに入れる', async () => {
		const el = await gallery()

		for (const grid of el.querySelectorAll('.sec .grid')) {
			const size = [...grid.classList]
				.find((name) => name.startsWith('grid-'))
				?.replace('grid-', '')

			for (const card of grid.querySelectorAll('.card-wrapper')) {
				expect(card.getAttribute('data-size')).toBe(size)
			}
		}
	})
})
