import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

/**
 * .astro コンポーネントを単体レンダーし、DOM として assert できる形で返す。
 * Container API は文字列しか返さないので happy-dom でパースする。
 */
/**
 * snapshot 比較用に、環境・行番号に依存する属性を落とした HTML を返す。
 * data-astro-source-file は絶対パスなので、素の出力は CI と手元で必ず食い違う。
 */
export const renderNormalizedHtml = async (
	Component: AstroComponentFactory,
	props: Record<string, unknown> = {}
): Promise<string> => {
	const container = await AstroContainer.create()
	const html = await container.renderToString(Component, { props })

	return html
		.replace(/\s+data-astro-cid-[a-z0-9]+(?:="")?/g, '')
		.replace(/\s+data-astro-source-(?:file|loc)="[^"]*"/g, '')
		.replace(/>\s*</g, '>\n<')
		.trim()
}

export const renderFragment = async (
	Component: AstroComponentFactory,
	props: Record<string, unknown> = {}
): Promise<Element> => {
	const container = await AstroContainer.create()
	const html = await container.renderToString(Component, { props })
	const host = document.createElement('div')

	host.innerHTML = html
	return host
}
