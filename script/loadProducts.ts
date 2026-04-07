import { Client } from '@notionhq/client'
import type {
	PageObjectResponse,
	RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'
import assert from 'assert'

const { NOTION_SECRET, NOTION_TARGET_DB } = process.env

assert(NOTION_SECRET, 'NOTION_SECRET not setup')
assert(NOTION_TARGET_DB, 'NOTION_TARGET_DB not setup')

type ProductSize = 'XS' | 'S' | 'M' | 'L'

type Product = {
	title: string
	url: string
	urlLive: boolean
	description: string
	filename: string
	tags: string[]
	size: ProductSize
	hasImage: boolean
	imageFit: 'cover' | 'contain'
	gridColumn: string
	gridRow: string
}

const TAG_MAP: Record<string, string> = {
	TSX: 'React',
	TS: 'TypeScript',
	JS: 'JavaScript',
}

function richTextToPlain(richText: RichTextItemResponse[]): string {
	return richText.map((t) => t.plain_text).join('')
}

function toFilename(title: string): string {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') + '.png'
}

function detectImageFit(imgPath: string): 'cover' | 'contain' {
	try {
		const out = execSync(`identify -format "%wx%h" "${imgPath}"`, { encoding: 'utf-8' }).trim()
		const [w, h] = out.split('x').map(Number)
		// landscape images (wider than 4:3) use cover, others use contain
		return w > h * 1.2 ? 'cover' : 'contain'
	} catch {
		return 'contain'
	}
}

function normalizeTag(tag: string): string {
	return TAG_MAP[tag] ?? tag
}

function extractProduct(page: PageObjectResponse): Product | null {
	const props = page.properties

	// only status=有効
	const statusProp = props['status']
	if (statusProp?.type === 'select' && statusProp.select?.name !== '有効') return null

	// only Web category
	const catProp = props['Category']
	if (catProp?.type === 'select' && catProp.select?.name !== 'Web') return null

	const titleProp = props['Name']
	if (!titleProp || titleProp.type !== 'title') return null
	const title = richTextToPlain(titleProp.title)
	if (!title) return null

	const urlProp = props['Url']
	const url = urlProp?.type === 'rich_text' ? richTextToPlain(urlProp.rich_text) : ''

	const urlLiveProp = props['urlLive']
	const urlLive = urlLiveProp?.type === 'checkbox' ? urlLiveProp.checkbox : false

	const descProp = props['Description']
	const description =
		descProp?.type === 'rich_text' ? richTextToPlain(descProp.rich_text) : ''

	const tagsProp = props['Tags']
	const tags =
		tagsProp?.type === 'multi_select'
			? tagsProp.multi_select.map((t) => normalizeTag(t.name))
			: []

	const filenameProp = props['Filename']
	const filename =
		filenameProp?.type === 'rich_text' && richTextToPlain(filenameProp.rich_text)
			? richTextToPlain(filenameProp.rich_text)
			: toFilename(title)

	const sizeProp = props['Quority']
	const sizeRaw = sizeProp?.type === 'select' ? sizeProp.select?.name : null
	const sizeMap: Record<string, ProductSize> = { XS: 'XS', S: 'S', M: 'M', L: 'L' }
	const size: ProductSize = (sizeRaw && sizeMap[sizeRaw]) ?? 'M'

	const staticDir = resolve(__dirname, '../public/static')
	const imgPath = resolve(staticDir, filename)
	const hasImage = existsSync(imgPath)
	const imageFit = hasImage ? detectImageFit(imgPath) : 'contain' as const

	return { title, url, urlLive, description, filename, tags, size, hasImage, imageFit }
}

async function main() {
	const notion = new Client({ auth: NOTION_SECRET })

	const pages: PageObjectResponse[] = []
	let cursor: string | undefined

	while (true) {
		const res = await notion.databases.query({
			database_id: NOTION_TARGET_DB!,
			start_cursor: cursor,
		})
		for (const page of res.results) {
			if ('properties' in page) {
				pages.push(page as PageObjectResponse)
			}
		}
		if (!res.has_more) break
		cursor = res.next_cursor ?? undefined
	}

	const products = pages
		.map(extractProduct)
		.filter((p): p is Product => p !== null)

	console.log(`Loaded ${products.length} products from Notion (${pages.length} total pages)`)

	// check for missing images
	const staticDir = resolve(__dirname, '../public/static')
	for (const p of products) {
		const imgPath = resolve(staticDir, p.filename)
		if (!existsSync(imgPath)) {
			console.warn(`  ⚠ Missing image: public/static/${p.filename} (${p.title})`)
		}
	}

	const placed = computeGridLayout(products, 4)
	const output = generateDataFile(placed)
	const outPath = resolve(__dirname, '../src/api/products.ts')
	writeFileSync(outPath, output, 'utf-8')
	console.log(`Written to ${outPath}`)
}

function sizeToSpan(size: ProductSize): { colSpan: number; rowSpan: number } {
	switch (size) {
		case 'XS': return { colSpan: 1, rowSpan: 1 }
		case 'S': return { colSpan: 1, rowSpan: 1 }
		case 'M': return { colSpan: 2, rowSpan: 1 }
		case 'L': return { colSpan: 2, rowSpan: 2 }
	}
}

function computeGridLayout(products: Product[], cols: number): Product[] {
	// grid[row][col] = true if occupied
	const grid: boolean[][] = []

	function ensureRows(n: number) {
		while (grid.length < n) {
			grid.push(new Array(cols).fill(false))
		}
	}

	function canPlace(row: number, col: number, cSpan: number, rSpan: number): boolean {
		if (col + cSpan > cols) return false
		ensureRows(row + rSpan)
		for (let r = row; r < row + rSpan; r++) {
			for (let c = col; c < col + cSpan; c++) {
				if (grid[r][c]) return false
			}
		}
		return true
	}

	function occupy(row: number, col: number, cSpan: number, rSpan: number) {
		ensureRows(row + rSpan)
		for (let r = row; r < row + rSpan; r++) {
			for (let c = col; c < col + cSpan; c++) {
				grid[r][c] = true
			}
		}
	}

	const result: Product[] = []

	for (const p of products) {
		const { colSpan, rowSpan } = sizeToSpan(p.size)
		let placed = false

		for (let row = 0; !placed; row++) {
			ensureRows(row + 1)
			for (let col = 0; col <= cols - colSpan; col++) {
				if (canPlace(row, col, colSpan, rowSpan)) {
					occupy(row, col, colSpan, rowSpan)
					result.push({
						...p,
						gridColumn: `${col + 1} / span ${colSpan}`,
						gridRow: `${row + 1} / span ${rowSpan}`,
					})
					placed = true
					break
				}
			}
		}
	}

	const totalRows = grid.length
	console.log(`Grid layout: ${cols} cols × ${totalRows} rows, ${products.length} items placed`)
	return result
}

function generateDataFile(products: Product[]): string {
	const lines = [
		"import type { Product } from '../types'",
		'',
		'export const products: Product[] = [',
	]

	for (const p of products) {
		lines.push('\t{')
		lines.push(`\t\ttitle: ${JSON.stringify(p.title)},`)
		lines.push(`\t\turl: ${JSON.stringify(p.url)},`)
		lines.push(`\t\turlLive: ${p.urlLive},`)
		lines.push(`\t\tdescription: ${JSON.stringify(p.description)},`)
		lines.push(`\t\tfilename: ${JSON.stringify(p.filename)},`)
		lines.push(`\t\ttags: ${JSON.stringify(p.tags)},`)
		lines.push(`\t\tsize: ${JSON.stringify(p.size)},`)
		lines.push(`\t\thasImage: ${p.hasImage},`)
		lines.push(`\t\timageFit: ${JSON.stringify(p.imageFit)},`)
		lines.push(`\t\tgridColumn: ${JSON.stringify(p.gridColumn)},`)
		lines.push(`\t\tgridRow: ${JSON.stringify(p.gridRow)},`)
		lines.push('\t},')
	}

	lines.push(']')
	lines.push('')
	return lines.join('\n')
}

main()
