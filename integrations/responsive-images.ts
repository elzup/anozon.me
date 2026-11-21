// dev / build の開始時に public/static の画像から幅別 webp を public/static/_r/ へ生成する。
// _r/ は生成物なので .gitignore 済み。元画像より新しい生成物があれば作り直さない
import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import type { AstroIntegration } from 'astro'
import sharp from 'sharp'
import { RESPONSIVE_DIR, RESPONSIVE_WIDTHS, isResizable, variantUrl } from '../src/lib/responsiveImage'

// スクショ主体なので文字の滲みが目立たない程度に高め
const WEBP_QUALITY = 80

const walk = async (dir: string): Promise<string[]> => {
	const entries = await readdir(dir, { withFileTypes: true })
	const nested = await Promise.all(
		entries.map((entry) => {
			const path = join(dir, entry.name)
			if (entry.isDirectory()) return entry.name === RESPONSIVE_DIR ? [] : walk(path)
			return [path]
		})
	)
	return nested.flat()
}

const isFresh = async (source: string, output: string) => {
	try {
		return (await stat(output)).mtimeMs >= (await stat(source)).mtimeMs
	} catch {
		// 生成物がまだ無い
		return false
	}
}

const generate = async (publicDir: string) => {
	const staticDir = join(publicDir, 'static')
	const sources = (await walk(staticDir))
		.map((path) => ({ path, url: `/${relative(publicDir, path).split('\\').join('/')}` }))
		.filter(({ url }) => isResizable(url))

	let created = 0
	for (const { path, url } of sources) {
		for (const width of RESPONSIVE_WIDTHS) {
			const output = join(publicDir, variantUrl(url, width))
			if (await isFresh(path, output)) continue
			await mkdir(dirname(output), { recursive: true })
			await sharp(path)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality: WEBP_QUALITY })
				.toFile(output)
			created += 1
		}
	}
	return { sources: sources.length, created }
}

export const responsiveImages = (): AstroIntegration => ({
	name: 'responsive-images',
	hooks: {
		'astro:config:setup': async ({ config, logger }) => {
			const publicDir = new URL(config.publicDir).pathname
			const { sources, created } = await generate(publicDir)
			logger.info(`${sources} images, ${created} variants generated`)
		},
	},
})
