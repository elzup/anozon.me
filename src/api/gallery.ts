import { parse } from 'node:path'
import type { Product } from '../types'
import r2Keys from './r2Images.json'

// products.ts は Notion 同期で丸ごと再生成されるので、追加画像は置き場所の規約で持つ:
// gallery/<filename の拡張子なし>/ に置いた画像を名前順に並べる。
// 画像の正本は R2 なので、並びは script/syncImagesToR2.ts が書いたキー一覧 (r2Images.json) から決める
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i

// 画像の無い package は filename が "" で来るので、script/loadProducts.ts の toFilename と同じ規則でタイトルから作る
const slugOf = (title: string) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')

export const galleryKeyOf = (product: Product) => parse(product.filename).name || slugOf(product.title)

/** モーダルで見せる画像 URL。1 枚目はカードと同じメイン画像 (あれば) */
export const productImages = (product: Product, keys: readonly string[] = r2Keys): string[] => {
	const prefix = `gallery/${galleryKeyOf(product)}/`
	const extras = keys
		// サブフォルダは対象外 (旧実装の readdir と同じく直下だけ)
		.filter((key) => key.startsWith(prefix) && !key.slice(prefix.length).includes('/') && IMAGE_EXT.test(key))
		.sort()
		.map((key) => `/static/${key}`)
	const main = product.hasImage ? [`/static/${product.filename}`] : []

	return [...main, ...extras]
}
