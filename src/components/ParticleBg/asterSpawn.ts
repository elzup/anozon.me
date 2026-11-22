// UTC の 年月日 / 時分秒 を fupf (elzup/fupf) の Aster グリフ 2 段 × 3 つで描いた初期配置。
// Aster は 8 方向の放射線で 1 byte (0〜255) を表す: bit7 = 上、そこから時計回りに bit0 = 左上。
// 隣り合う 2 本が両方 on ならその間の扇を塗る (fupf src/glyph/modes/aster.ts と同じ規則)。
// SVG を描いて画素を拾うより、同じ図形を座標で直接撒く方が速く、粒子数に合わせて密度も揃えられる

type Point = { x: number; y: number; type?: number }

type SpawnContext = { count: number; types: number; aspect: number }

const DIRECTIONS = 8
const LAST_PATTERN = 255
// グリフ 1 つの半径 (要素の高さ比)。2 段 × 3 つ並べても横長の画面に収まり、形が読める大きさ
const GLYPH_RADIUS = 0.16
// グリフの中心の間隔 (半径比)
const GLYPH_GAP = 2.6
// 並べた全体の幅・高さの上限 (要素比)。縦長のスマホなどでは半径をこれに収まるまで縮める
const MAX_ROW_WIDTH = 0.9
// 粒子のうちグリフに使う割合 (6 つに分けるので多めに)。残りは乱数の配置のまま背景に散らし、全体が空にならないようにする
const GLYPH_SHARE = 0.7
// 線の太さ (半径比)。細すぎると粒子が 1 列に並んで線に見えない
const SPOKE_WIDTH = 0.09
// 中心の点 (半径比)。0 (全部 off) でも何かが見えるように常に置く
const HUB_RADIUS = 0.12
// 扇 1 枚は線 1 本の何倍の粒子を受け持つか (面積の比のおおよそ)
const SECTOR_WEIGHT = 3

/** fupf のクロックデモと同じ換算: 値を 0〜255 に等間隔で写す */
export const samplePattern = (value: number, lastValue: number): number =>
	lastValue <= 0 ? 0 : Math.round((value * LAST_PATTERN) / lastValue)

// 年は下 2 桁 (00〜99) を写す。4 桁のままだと 1 byte に収めた差が年ごとに 0.06 刻みになり形が変わらない
const YEARS_PER_CENTURY = 100

/** 上の段 = 年月日、下の段 = 時分秒 (UTC)。月と日は 1 始まりなので 0 始まりに直してから写す */
export const utcPatterns = (now: Date): number[][] => [
	[
		samplePattern(now.getUTCFullYear() % YEARS_PER_CENTURY, YEARS_PER_CENTURY - 1),
		samplePattern(now.getUTCMonth(), 11),
		samplePattern(now.getUTCDate() - 1, 30),
	],
	[
		samplePattern(now.getUTCHours(), 23),
		samplePattern(now.getUTCMinutes(), 59),
		samplePattern(now.getUTCSeconds(), 59),
	],
]

const isOn = (pattern: number, dir: number): boolean => ((pattern >> (7 - dir)) & 1) === 1

const angleOf = (dir: number): number => -Math.PI / 2 + (dir * Math.PI) / 4

type Shape = { kind: 'hub' } | { kind: 'spoke'; dir: number } | { kind: 'sector'; dir: number }

const shapesOf = (pattern: number): Shape[] => {
	const dirs = Array.from({ length: DIRECTIONS }, (_, d) => d)
	const spokes = dirs.filter((d) => isOn(pattern, d)).map((dir): Shape => ({ kind: 'spoke', dir }))
	const sectors = dirs
		.filter((d) => isOn(pattern, d) && isOn(pattern, (d + 1) % DIRECTIONS))
		.map((dir): Shape => ({ kind: 'sector', dir }))
	return [{ kind: 'hub' }, ...spokes, ...sectors]
}

const weightOf = (s: Shape): number => (s.kind === 'sector' ? SECTOR_WEIGHT : 1)

// 形の中の 1 点 (中心 0,0、半径 1 の座標)。rng は 0〜1 の一様乱数
const sampleShape = (s: Shape, rng: () => number): [number, number] => {
	if (s.kind === 'hub') {
		const a = rng() * Math.PI * 2
		const r = Math.sqrt(rng()) * HUB_RADIUS
		return [Math.cos(a) * r, Math.sin(a) * r]
	}
	if (s.kind === 'spoke') {
		const a = angleOf(s.dir)
		const along = rng()
		const across = (rng() - 0.5) * SPOKE_WIDTH
		return [Math.cos(a) * along - Math.sin(a) * across, Math.sin(a) * along + Math.cos(a) * across]
	}
	// 扇は面積が一様になるよう半径を sqrt で引く
	const a = angleOf(s.dir) + rng() * (Math.PI / 4)
	const r = Math.sqrt(rng())
	return [Math.cos(a) * r, Math.sin(a) * r]
}

// 扇・線は方向ごとに種類を変える (fupf が方向ごとに色を変えるのに倣う)。中心は 0 番 (main) の色
const typeOf = (s: Shape, types: number): number => (s.kind === 'hub' ? 0 : s.dir % types)

const glyphPoints = (
	pattern: number,
	center: [number, number],
	radius: number,
	budget: number,
	ctx: SpawnContext,
	rng: () => number
): Point[] => {
	const shapes = shapesOf(pattern)
	const total = shapes.reduce((sum, s) => sum + weightOf(s), 0)
	return shapes.flatMap((s) => {
		const n = Math.round((budget * weightOf(s)) / total)
		return Array.from({ length: n }, () => {
			const [dx, dy] = sampleShape(s, rng)
			// 座標は幅・高さそれぞれ 0〜1 なので、横は縦横比で割って円を潰さない
			return {
				x: center[0] + (dx * radius) / ctx.aspect,
				y: center[1] + dy * radius,
				type: typeOf(s, ctx.types),
			}
		})
	})
}

/** particle-life-bg の spawn に渡す関数を作る。時刻は呼んだ時点ではなく作った時点 (= load 時) で固定 */
export const createAsterSpawn = (now: Date = new Date(), rng: () => number = Math.random) => {
	const rows = utcPatterns(now)
	const glyphCount = rows.flat().length
	return (ctx: SpawnContext): Point[] => {
		const budget = Math.floor((ctx.count * GLYPH_SHARE) / glyphCount)
		// 1 段の幅 = 中心間隔 2 つ + 両端の半径 = 半径 × (2 × GAP + 2)。2 段の高さ = 半径 × (GAP + 2)
		const fitWidth = (MAX_ROW_WIDTH * ctx.aspect) / (2 * GLYPH_GAP + 2)
		const fitHeight = MAX_ROW_WIDTH / ((rows.length - 1) * GLYPH_GAP + 2)
		const radius = Math.min(GLYPH_RADIUS, fitWidth, fitHeight)
		const stepX = (radius * GLYPH_GAP) / ctx.aspect
		const stepY = radius * GLYPH_GAP
		const middleRow = (rows.length - 1) / 2
		return rows.flatMap((row, r) =>
			row.flatMap((p, i) =>
				glyphPoints(p, [0.5 + (i - 1) * stepX, 0.5 + (r - middleRow) * stepY], radius, budget, ctx, rng)
			)
		)
	}
}
