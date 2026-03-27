import { Client } from '@notionhq/client'
import type {
	PageObjectResponse,
	RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import assert from 'assert'

const { NOTION_SECRET, NOTION_TARGET_DB } = process.env

assert(NOTION_SECRET, 'NOTION_SECRET not setup')
assert(NOTION_TARGET_DB, 'NOTION_TARGET_DB not setup')

function richTextToPlain(richText: RichTextItemResponse[]): string {
	return richText.map((t) => t.plain_text).join('')
}

// Products that exist in the old data.tsx but not in Notion
const missingProducts = [
	{
		title: 'elzup.com',
		url: 'https://elzup.com',
		urlLive: true,
		description: '大学時代の自分跡地',
		filename: 'elzup.png',
		tags: ['React'],
		category: 'Web',
		quality: 'M',
		order: 1,
	},
	{
		title: 'uniballoon',
		url: 'https://uniballoon.com',
		urlLive: false,
		description: 'アイデア共有サイト',
		filename: 'uniballoon.png',
		tags: ['React'],
		category: 'Web',
		quality: 'M',
		order: 2,
	},
	{
		title: 'nozctf',
		url: 'https://nozctf.web.app',
		urlLive: true,
		description: 'Firebase で作った web 問題 CTF サイト',
		filename: 'nozctf.png',
		tags: ['React', 'TS'],
		category: 'Web',
		quality: 'M',
		order: 5,
	},
]

// Filename mappings for existing Notion pages
const filenameMap: Record<string, string> = {
	'anozon.me': 'another-node.png',
	'blog.anozon.me': 'anozonblog.png',
	'Mitelop': 'mitelop.png',
	'Saikoron': 'saikoron.png',
	'Dentime': 'dentime.png',
	'苦手タイパー': 'nigate-typer.png',
	'Clipsh': 'clipsh.png',
	'ピクブルMEMO': 'pikuburu-memo.png',
}

async function main() {
	const notion = new Client({ auth: NOTION_SECRET })

	// 1. Update existing pages with Filename
	console.log('--- Updating existing pages with Filename ---')
	const res = await notion.databases.query({
		database_id: NOTION_TARGET_DB!,
		page_size: 100,
	})

	for (const page of res.results) {
		if (!('properties' in page)) continue
		const p = page as PageObjectResponse
		const nameProp = p.properties['Name']
		if (nameProp?.type !== 'title') continue
		const name = richTextToPlain(nameProp.title)

		const fn = filenameMap[name]
		if (!fn) continue

		console.log(`  Setting Filename for "${name}" → ${fn}`)
		await notion.pages.update({
			page_id: p.id,
			properties: {
				Filename: { rich_text: [{ text: { content: fn } }] },
			},
		})
	}

	// 2. Create missing products
	console.log('--- Creating missing products ---')
	for (const p of missingProducts) {
		console.log(`  Creating: ${p.title}`)
		await notion.pages.create({
			parent: { database_id: NOTION_TARGET_DB! },
			properties: {
				Name: {
					title: [{ text: { content: p.title } }],
				},
				Url: {
					rich_text: [{ text: { content: p.url } }],
				},
				urlLive: {
					checkbox: p.urlLive,
				},
				Description: {
					rich_text: [{ text: { content: p.description } }],
				},
				Filename: {
					rich_text: [{ text: { content: p.filename } }],
				},
				Tags: {
					multi_select: p.tags.map((name) => ({ name })),
				},
				Category: {
					select: { name: p.category },
				},
				Quority: {
					select: { name: p.quality },
				},
				Order: {
					number: p.order,
				},
			},
		})
	}

	console.log(`Done. Updated filenames and created ${missingProducts.length} missing products.`)
}

main()
