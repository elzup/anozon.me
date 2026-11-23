// 画像の配信 URL を組み立てる。幅別の縮小版は Cloudflare Image Transformations (/cdn-cgi/image/) が配信時に作る。
// - tumblr/ と gallery/ は R2 (img.anozon.me) が正本で、リポジトリには無い (script/syncImagesToR2.ts で上げる)
// - それ以外の /static/ はリポジトリにあり、anozon.me 自身の上で変換する
// 呼び出し側のデータは R2 の分も `/static/...` のまま持ち、ここで配信先に振り分ける

/** カードは 480 / 960、モーダルは 960 / 1800 を使う */
export const RESPONSIVE_WIDTHS = [480, 960, 1800] as const
export type ResponsiveWidth = (typeof RESPONSIVE_WIDTHS)[number]

export const R2_BUCKET = 'anozon-images'
export const R2_DIRS = ['tumblr', 'gallery'] as const
export const IMAGE_HOST = 'https://img.anozon.me'

// スクショ主体なので文字の滲みが目立たない程度に高め (旧 sharp 生成時の webp 80 と同じ)
const QUALITY = 80
const RASTER_EXT = /\.(png|jpe?g|webp)$/i

const isR2 = (src: string) => R2_DIRS.some((dir) => src.startsWith(`/static/${dir}/`))
const r2Path = (src: string) => src.replace(/^\/static/, '')

// /cdn-cgi/image/ は Cloudflare の zone 上でしか動かないので、ローカル dev のリポジトリ画像は原寸のまま返す。
// vitest の MODE は 'test' なので本番の URL で検証される。node から直接 import されると env が無い
const isLocalDev = () => import.meta.env?.MODE === 'development'

export const isResizable = (src: string) => src.startsWith('/static/') && RASTER_EXT.test(src)

/** 縮めない原寸の URL (リンク先など) */
export const originalUrl = (src: string) => (isR2(src) ? `${IMAGE_HOST}${r2Path(src)}` : src)

export const variantUrl = (src: string, width: ResponsiveWidth) => {
	// 元画像より大きくはしない (scale-down)。format=auto はブラウザに合わせて avif / webp を選ぶ
	const options = `width=${width},fit=scale-down,format=auto,quality=${QUALITY}`
	if (isR2(src)) return `${IMAGE_HOST}/cdn-cgi/image/${options}${r2Path(src)}`
	return isLocalDev() ? src : `/cdn-cgi/image/${options}${src}`
}

export type ResponsiveAttrs = { src: string; srcset?: string }

/** widths の先頭を既定の src にする (srcset 非対応環境では一番軽いもの) */
export const responsiveAttrs = (src: string, widths: readonly ResponsiveWidth[]): ResponsiveAttrs =>
	isResizable(src)
		? {
				src: variantUrl(src, widths[0]),
				srcset: widths.map((width) => `${variantUrl(src, width)} ${width}w`).join(', '),
			}
		: { src: originalUrl(src) }

export const CARD_WIDTHS: readonly ResponsiveWidth[] = [480, 960]
export const MODAL_WIDTHS: readonly ResponsiveWidth[] = [960, 1800]
