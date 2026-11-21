import { describe, expect, it } from 'vitest'
import { responsiveAttrs, variantUrl } from './responsiveImage'

describe('responsiveImage', () => {
	it('public/static 配下の画像を _r/ の幅別 webp に写す (サブフォルダも保つ)', () => {
		expect(variantUrl('/static/gallery/999/01.png', 960)).toBe('/static/_r/gallery/999/01-960.webp')
	})

	it('先頭の幅を src、全幅を srcset にする', () => {
		expect(responsiveAttrs('/static/quota.png', [480, 960])).toEqual({
			src: '/static/_r/quota-480.webp',
			srcset: '/static/_r/quota-480.webp 480w, /static/_r/quota-960.webp 960w',
		})
	})

	it('SVG や GIF は縮めずそのまま使う', () => {
		expect(responsiveAttrs('/static/rangeize.svg', [480])).toEqual({ src: '/static/rangeize.svg' })
		expect(responsiveAttrs('/static/anim.gif', [480])).toEqual({ src: '/static/anim.gif' })
	})
})
