import { describe, expect, it } from 'vitest'
import { products } from '../../api/data'
import type { ProductSize } from '../../types'
import { renderFragment } from '../../test/render'
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
