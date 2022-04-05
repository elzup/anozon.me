import { Client } from '@notionhq/client'
import assert from 'assert'
const { NOTION_SECRET, NOTION_TARGET_DB } = process.env

assert(NOTION_SECRET, 'NOTION_SECRET not setup')
assert(NOTION_TARGET_DB, 'NOTION_TARGET_DB not setup')

const dbId = NOTION_TARGET_DB

async function main() {
	const notion = new Client({ auth: NOTION_SECRET })
	const db = await notion.databases.query({ database_id: dbId })
	console.log(db.results)
}

main()
