import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

/**
 * .astro コンポーネントを単体レンダーし、DOM として assert できる形で返す。
 * Container API は文字列しか返さないので happy-dom でパースする。
 */
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
