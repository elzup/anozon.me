import { COLOR_SCHEMES } from 'particle-life-bg'

type Matrix = number[][]

// particle-life-bg の seed は整数なら何でもよい。表で読み取れる桁に収める
const SEED_RANGE = 100000

export const randomSeed = (): number => Math.floor(Math.random() * SEED_RANGE)

/** preset で seed を固定していなければ、load ごとに違う群れになるよう乱数の seed を入れる */
export const ensureSeed = (el: HTMLElement): void => {
	if (el.hasAttribute('seed')) return
	el.setAttribute('seed', String(randomSeed()))
}

// colors 属性は scheme より優先され、種類数より短ければ繰り返す (particle-life-bg の仕様)
const typeColor = (el: HTMLElement, t: number, n: number): string => {
	const colors = el.getAttribute('colors')?.split(/\s+/).filter(Boolean) ?? []
	if (colors.length > 0) return colors[t % colors.length] ?? '#888'
	const s = COLOR_SCHEMES[(el.getAttribute('scheme') ?? 'rainbow') as keyof typeof COLOR_SCHEMES]
	return s === undefined ? '#888' : s.color(t, n)
}

// 引力 (正) を濃い灰、斥力 (負) を赤で塗る。絶対値を不透明度にして強さを見せる
const cellBackground = (v: number): string =>
	v >= 0 ? `rgba(40, 40, 40, ${v * 0.6})` : `rgba(200, 40, 40, ${-v * 0.6})`

const cell = (tag: 'th' | 'td', text: string): HTMLElement => {
	const node = document.createElement(tag)
	node.textContent = text
	return node
}

const swatch = (color: string, label: string): HTMLElement => {
	const th = cell('th', label)
	th.style.setProperty('--swatch', color)
	return th
}

// 行見出しの幅を揃えるため draw-style は 1 文字にする。speedGlow は頭文字が streak と被るので V (velocity)
const STYLE_ABBR: Record<string, string> = {
	dots: 'D',
	glow: 'G',
	trail: 'T',
	streak: 'S',
	links: 'L',
	mono: 'M',
	speedGlow: 'V',
	crowdGlow: 'C',
}

const styleAbbr = (style: string): string => STYLE_ABBR[style] ?? style.charAt(0).toUpperCase()

const buildTable = (el: HTMLElement, matrix: Matrix): HTMLTableElement => {
	const n = matrix.length
	const styles = (el.getAttribute('draw-style') ?? 'dots').split(/[\s,]+/)
	const table = document.createElement('table')

	const head = document.createElement('tr')
	head.append(cell('th', 'i→j'), ...matrix.map((_, j) => swatch(typeColor(el, j, n), String(j))))
	table.append(head)

	matrix.forEach((row, i) => {
		const tr = document.createElement('tr')
		const style = styles[i % styles.length] ?? ''
		const rowHead = swatch(typeColor(el, i, n), `${i} ${styleAbbr(style)}`)
		// 略字だけだと読めないので hover で元の名前を出す
		rowHead.title = style
		tr.append(rowHead)
		row.forEach((v) => {
			const td = cell('td', v.toFixed(2))
			td.style.background = cellBackground(v)
			tr.append(td)
		})
		table.append(tr)
	})
	return table
}

type ParticleElement = HTMLElement & { matrix?: Matrix; controller?: { engine?: string } }

// engine は最初の描画の後に WASM が読み込まれて 'js' → 'wasm' に変わるので、開くたびに読み直す
const summary = (el: ParticleElement, n: number): string =>
	['seed', 'count', 'force']
		.map((a) => `${a} ${el.getAttribute(a) ?? '-'}`)
		.concat(`types ${n}`, `engine ${el.controller?.engine ?? '-'}`)
		.join(' · ')

/** element 登録後に呼ぶ。実際に使われている引力行列を panel に書き出す */
export const renderParamTable = (el: ParticleElement, panel: HTMLElement): void => {
	const matrix = el.matrix ?? []
	if (matrix.length === 0) {
		console.error('[ParticleBg] matrix を取得できない (element 未登録?)')
		return
	}
	const caption = document.createElement('p')
	caption.textContent = summary(el, matrix.length)
	panel.replaceChildren(caption, buildTable(el, matrix))
}
