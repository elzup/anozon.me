// public/static の tumblr/ と gallery/ を R2 (anozon-images, img.anozon.me) へ上げ、キー一覧を src/api/r2Images.json に書く。
// この 2 つは増え続けるので git に積まず R2 を正本にする。一覧をコミットするのは、CI に画像が無くても
// ビルド時に gallery の並びを決められるようにするため (src/api/gallery.ts が読む)
//
//   node script/syncImagesToR2.ts [--static-dir public/static] [--manifest src/api/r2Images.json] [--dry-run]
//
// 既に R2 にあるキーも上書きする (同名で差し替えた画像を反映させるため。数百枚なので全量で困らない)
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { extname, join, relative, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { R2_BUCKET, R2_DIRS } from '../src/lib/responsiveImage.ts'

const CONTENT_TYPES: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.avif': 'image/avif',
	'.svg': 'image/svg+xml',
}
// 同名で差し替えることがあるので immutable にはしない。変換結果は Cloudflare 側で別にキャッシュされる
const CACHE_CONTROL = 'public, max-age=86400'

type Entry = { key: string; file: string; contentType: string }

const walk = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name)
		return entry.isDirectory() ? walk(path) : [path]
	})

const collect = (staticDir: string): Entry[] =>
	R2_DIRS.flatMap((dir) => {
		const root = join(staticDir, dir)
		return existsSync(root) ? walk(root) : []
	})
		.map((file) => ({
			key: relative(staticDir, file).split('\\').join('/'),
			file,
			contentType: CONTENT_TYPES[extname(file).toLowerCase()] ?? '',
		}))
		.filter((entry) => entry.contentType !== '')
		.sort((a, b) => a.key.localeCompare(b.key))

// wrangler の bulk put は 1 回の呼び出しで Content-Type を 1 つしか付けられないので種類ごとに分ける
const upload = (entries: Entry[]) => {
	const workDir = mkdtempSync(join(tmpdir(), 'r2-sync-'))
	const types = [...new Set(entries.map((entry) => entry.contentType))]
	for (const contentType of types) {
		const list = entries.filter((entry) => entry.contentType === contentType)
		const listFile = join(workDir, `${contentType.replace('/', '-').replace('+', '-')}.json`)
		writeFileSync(listFile, JSON.stringify(list.map(({ key, file }) => ({ key, file }))))
		console.log(`${contentType}: ${list.length} files`)
		execFileSync(
			'bunx',
			['wrangler', 'r2', 'bulk', 'put', R2_BUCKET, '--remote', '-y', '-f', listFile, '--ct', contentType, '--cc', CACHE_CONTROL],
			{ stdio: 'inherit' }
		)
	}
}

const main = () => {
	const { values } = parseArgs({
		options: {
			'static-dir': { type: 'string', default: 'public/static' },
			manifest: { type: 'string', default: 'src/api/r2Images.json' },
			'dry-run': { type: 'boolean', default: false },
		},
	})
	const staticDir = resolve(values['static-dir'])
	const entries = collect(staticDir)
	if (entries.length === 0) throw new Error(`${staticDir} に ${R2_DIRS.join(' / ')} の画像がありません`)

	if (!values['dry-run']) upload(entries)
	writeFileSync(resolve(values.manifest), `${JSON.stringify(entries.map((entry) => entry.key), null, '\t')}\n`)
	console.log(`${entries.length} keys -> ${values.manifest}${values['dry-run'] ? ' (dry-run, upload なし)' : ''}`)
}

main()
