import { existsSync, readdirSync } from 'node:fs'
import { join, parse } from 'node:path'
import type { Product } from '../types'

// products.ts は Notion 同期で丸ごと再生成されるので、追加画像は置き場所の規約で持つ:
// public/static/gallery/<filename の拡張子なし>/ に置いた画像を名前順に並べる
const DEFAULT_GALLERY_DIR = join(process.cwd(), 'public/static/gallery')
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i

// 画像の無い package は filename が "" で来るので、script/loadProducts.ts の toFilename と同じ規則でタイトルから作る
const slugOf = (title: string) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const galleryKeyOf = (product: Product) => parse(product.filename).name || slugOf(product.title)

/** モーダルで見せる画像 URL。1 枚目はカードと同じメイン画像 (あれば) */
export const productImages = (product: Product, galleryDir = DEFAULT_GALLERY_DIR): string[] => {
	const key = galleryKeyOf(product)
	const dir = join(galleryDir, key)
	const extras = existsSync(dir)
		? readdirSync(dir)
				.filter((name) => IMAGE_EXT.test(name))
				.sort()
				.map((name) => `/static/gallery/${key}/${name}`)
		: []
	const main = product.hasImage ? [`/static/${product.filename}`] : []

	return [...main, ...extras]
}
