import { describe, expect, it } from 'vitest'
import { originalUrl, responsiveAttrs, variantUrl } from './responsiveImage'

const OPTS = 'fit=scale-down,format=auto,quality=80'

describe('responsiveImage', () => {
	it('リポジトリの画像は anozon.me 上の /cdn-cgi/image/ で縮める', () => {
		expect(variantUrl('/static/quota.png', 960)).toBe(`/cdn-cgi/image/width=960,${OPTS}/static/quota.png`)
	})

	it('tumblr/ と gallery/ は R2 (img.anozon.me) から縮めて配信する', () => {
		expect(variantUrl('/static/gallery/999/01.png', 480)).toBe(
			`https://img.anozon.me/cdn-cgi/image/width=480,${OPTS}/gallery/999/01.png`
		)
		expect(originalUrl('/static/tumblr/1-0.webp')).toBe('https://img.anozon.me/tumblr/1-0.webp')
		expect(originalUrl('/static/quota.png')).toBe('/static/quota.png')
	})

	it('先頭の幅を src、全幅を srcset にする', () => {
		expect(responsiveAttrs('/static/quota.png', [480, 960])).toEqual({
			src: `/cdn-cgi/image/width=480,${OPTS}/static/quota.png`,
			srcset: `/cdn-cgi/image/width=480,${OPTS}/static/quota.png 480w, /cdn-cgi/image/width=960,${OPTS}/static/quota.png 960w`,
		})
	})

	it('SVG や GIF は縮めずそのまま使う (R2 のものは img.anozon.me の原寸)', () => {
		expect(responsiveAttrs('/static/rangeize.svg', [480])).toEqual({ src: '/static/rangeize.svg' })
		expect(responsiveAttrs('/static/tumblr/anim.gif', [480])).toEqual({ src: 'https://img.anozon.me/tumblr/anim.gif' })
	})
})
