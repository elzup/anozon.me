// public/static の画像を幅別の webp に縮めた版 (integrations/responsive-images.ts が生成) の URL を組み立てる。
// 生成物の実寸に依存させない (テストや SSR が生成の有無で変わらないよう、幅は固定の段で決め打ち)

/** カードは 480 / 960、モーダルは 960 / 1800 を使う。元画像より大きくは作らない (拡大しない) */
export const RESPONSIVE_WIDTHS = [480, 960, 1800] as const
export type ResponsiveWidth = (typeof RESPONSIVE_WIDTHS)[number]

export const RESPONSIVE_DIR = '_r'
const RASTER_EXT = /\.(png|jpe?g|webp)$/i

export const isResizable = (src: string) =>
	src.startsWith('/static/') && !src.startsWith(`/static/${RESPONSIVE_DIR}/`) && RASTER_EXT.test(src)

export const variantUrl = (src: string, width: ResponsiveWidth) =>
	src.replace(/^\/static\//, `/static/${RESPONSIVE_DIR}/`).replace(RASTER_EXT, `-${width}.webp`)

export type ResponsiveAttrs = { src: string; srcset?: string }

/** widths の先頭を既定の src にする (srcset 非対応環境では一番軽いもの) */
export const responsiveAttrs = (src: string, widths: readonly ResponsiveWidth[]): ResponsiveAttrs =>
	isResizable(src)
		? {
				src: variantUrl(src, widths[0]),
				srcset: widths.map((width) => `${variantUrl(src, width)} ${width}w`).join(', '),
			}
		: { src }

export const CARD_WIDTHS: readonly ResponsiveWidth[] = [480, 960]
export const MODAL_WIDTHS: readonly ResponsiveWidth[] = [960, 1800]
