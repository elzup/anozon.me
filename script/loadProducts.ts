import { Client } from '@notionhq/client'
import type {
	PageObjectResponse,
	RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import assert from 'assert'

const { NOTION_SECRET, NOTION_TARGET_DB } = process.env

assert(NOTION_SECRET, 'NOTION_SECRET not setup')
assert(NOTION_TARGET_DB, 'NOTION_TARGET_DB not setup')

type ProductSize = 'S' | 'M' | 'L'

type Product = {
	title: string
	url: string
	urlLive: boolean
	description: string
	filename: string
	tags: string[]
	size: ProductSize
	hasImage: boolean
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
	const size: ProductSize = sizeRaw === 'L' || sizeRaw === 'S' ? sizeRaw : 'M'

	const staticDir = resolve(__dirname, '../public/static')
	const hasImage = existsSync(resolve(staticDir, filename))

	return { title, url, urlLive, description, filename, tags, size, hasImage }
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

	const output = generateDataFile(products)
	const outPath = resolve(__dirname, '../src/api/products.ts')
	writeFileSync(outPath, output, 'utf-8')
	console.log(`Written to ${outPath}`)
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
		lines.push('\t},')
	}

	lines.push(']')
	lines.push('')
	return lines.join('\n')
}

main()
