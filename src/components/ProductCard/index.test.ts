import { describe, expect, it } from 'vitest'
import type { Product } from '../../types'
import { renderFragment } from '../../test/render'
import ProductCard from './index.astro'

const baseProduct: Product = {
	title: 'Sample',
	url: 'https://example.com/',
	urlLive: true,
	description: 'sample description',
	filename: 'sample.png',
	tags: ['React'],
	size: 'M',
	hasImage: true,
}

const render = (overrides: Partial<Product> = {}) =>
	renderFragment(ProductCard, { product: { ...baseProduct, ...overrides } })

const linkTitles = (el: Element) =>
	[...el.querySelectorAll('.link-icons .ext-link')].map((a) => a.getAttribute('title'))

describe('ProductCard 基本描画', () => {
	it('タイトルと説明を出す', async () => {
		const el = await render()

		expect(el.querySelector('h4')?.textContent).toBe('Sample')
		expect(el.querySelector('.info p')?.textContent).toBe('sample description')
	})

	it('size と kind を data 属性に出す (kind 未指定は app)', async () => {
		const el = await render({ size: 'L' })
		const wrapper = el.querySelector('.card-wrapper')

		expect(wrapper?.getAttribute('data-size')).toBe('L')
		expect(wrapper?.getAttribute('data-kind')).toBe('app')
	})
})

describe('ProductCard メディア分岐', () => {
	it('画像ありは 16:10 の img を出す', async () => {
		const el = await render({ imageFit: 'contain' })
		const media = el.querySelector('.media')

		expect(media?.classList.contains('fit-contain')).toBe(true)
		expect(media?.querySelector('img')?.getAttribute('src')).toBe('/static/sample.png')
	})

	it('画像なし・アイコンありはアイコン中央表示になる', async () => {
		const el = await render({ hasImage: false, iconFilename: 'icon.png' })

		expect(el.querySelector('.media.icon-only')).not.toBeNull()
		expect(el.querySelector('.icon-center')?.getAttribute('src')).toBe('/static/icon.png')
	})

	it('画像もアイコンも無ければタイトル入り placeholder になる', async () => {
		const el = await render({ hasImage: false })
		const placeholder = el.querySelector('.media.placeholder')

		expect(placeholder?.querySelector('span')?.textContent).toBe('Sample')
		expect(el.querySelector('img')).toBeNull()
	})

	it('placeholder の色はタイトルから決まる (同タイトルなら同色・別タイトルなら別色)', async () => {
		const style = async (title: string) =>
			(await render({ hasImage: false, title }))
				.querySelector('.media.placeholder')
				?.getAttribute('style')

		expect(await style('Sample')).toBe(await style('Sample'))
		expect(await style('Sample')).not.toBe(await style('Another'))
	})

	it('package は npm インストールコマンドを出す (packageName 未指定はタイトル)', async () => {
		const el = await render({ kind: 'package', hasImage: false })

		expect(el.querySelector('.pkg-badge')?.textContent).toBe('npm')
		expect(el.querySelector('.pkg-cmd')?.textContent).toContain('npm i Sample')
	})

	it('package で packageName があればそちらを使う', async () => {
		const el = await render({ kind: 'package', hasImage: false, packageName: '@elzup/kit' })

		expect(el.querySelector('.pkg-cmd')?.textContent).toContain('npm i @elzup/kit')
	})

	it('vscode-extension は code --install-extension を出す', async () => {
		const el = await render({ kind: 'vscode-extension', extensionId: 'elzup.maai-cursor' })

		expect(el.querySelector('.vscode-cmd')?.textContent).toContain(
			'code --install-extension elzup.maai-cursor'
		)
	})
})

describe('ProductCard 主リンクの優先順位', () => {
	const href = async (overrides: Partial<Product>) =>
		(await render(overrides)).querySelector('.card-link')?.getAttribute('href')

	const allLinks = {
		npmUrl: 'https://npm/x',
		marketplaceUrl: 'https://marketplace/x',
		githubUrl: 'https://github.com/x',
	}

	it('公開中の web URL が最優先', async () => {
		expect(await href(allLinks)).toBe('https://example.com/')
	})

	it('web が未公開なら npm', async () => {
		expect(await href({ ...allLinks, urlLive: false })).toBe('https://npm/x')
	})

	it('npm が無ければ marketplace', async () => {
		expect(await href({ ...allLinks, urlLive: false, npmUrl: undefined })).toBe(
			'https://marketplace/x'
		)
	})

	it('marketplace も無ければ GitHub', async () => {
		expect(
			await href({ ...allLinks, urlLive: false, npmUrl: undefined, marketplaceUrl: undefined })
		).toBe('https://github.com/x')
	})

	it('リンクが 1 つも無ければ # の disabled カードになる', async () => {
		const el = await render({ urlLive: false })
		const link = el.querySelector('.card-link')

		expect(link?.getAttribute('href')).toBe('#')
		expect(link?.getAttribute('data-disabled')).toBe('true')
	})

	it('リンクがあれば disabled にならない', async () => {
		expect((await render()).querySelector('.card-link')?.getAttribute('data-disabled')).toBe(
			'false'
		)
	})
})

describe('ProductCard 外部リンクアイコン', () => {
	it('持っているリンクだけを npm → Web → Marketplace → GitHub の順で出す', async () => {
		const el = await render({
			npmUrl: 'https://npm/x',
			marketplaceUrl: 'https://marketplace/x',
			githubUrl: 'https://github.com/x',
		})

		expect(linkTitles(el)).toEqual(['npm', 'Web', 'VS Code Marketplace', 'GitHub'])
	})

	it('未公開の web URL はアイコンに出さない', async () => {
		const el = await render({ urlLive: false, githubUrl: 'https://github.com/x' })

		expect(linkTitles(el)).toEqual(['GitHub'])
	})

	it('外部リンクは新規タブ + noopener で開く', async () => {
		const el = await render({ githubUrl: 'https://github.com/x' })

		for (const a of el.querySelectorAll('.link-icons .ext-link')) {
			expect(a.getAttribute('target')).toBe('_blank')
			expect(a.getAttribute('rel')).toBe('noopener noreferrer')
		}
	})

	it('アイコンリンクにタイトル付きの aria-label を付ける', async () => {
		const el = await render({ githubUrl: 'https://github.com/x' })

		expect(el.querySelector('.link-icons [title="GitHub"]')?.getAttribute('aria-label')).toBe(
			'Sample on GitHub'
		)
		expect(el.querySelector('.link-icons [title="Web"]')?.getAttribute('aria-label')).toBe(
			'Sample website'
		)
	})
})
