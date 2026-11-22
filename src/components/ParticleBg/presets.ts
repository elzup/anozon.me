// <particle-life-bg> の属性セット。キーは属性名そのまま (attributes.js の attr)
export type ParticleParams = Record<string, string>

export type ParticlePreset = {
	// count は 1440x900 の画面での粒子数。実際は箱の面積に比例させる (responsive.ts)
	params: ParticleParams
	// 幅 768px 未満でだけ上書きする属性 (force や fps など)
	mobile?: ParticleParams
	// 置き方の上書き。未指定ならそのスロットの既定 (TopPage 側) に従う
	mode?: 'fill' | 'sticky' | 'gutter'
	// true なら粒子の色を 1 種 1 色の曜日色 (weekColor.ts) にし、0 番を今日の色にする。params.colors を上書きする
	weekColors?: boolean
	// true なら load 時の UTC の年月日・時分秒を fupf の Aster グリフ (2 段 × 3) で描いた配置から始める (asterSpawn.ts)。
	// params の hold-ms でその形を見せておく時間を決める
	asterSpawn?: boolean
	// 背景が暗い preset。箱の中の文字を明るい色にする (index.astro の .night)
	night?: boolean
}

// screen は Profile〜Footer をまとめて包む (左右余白の gutter 用)
export type ParticleSlot = 'eyecatch' | 'profile' | 'works' | 'hobby' | 'screen'

// スマホは描画負荷を下げる: fps 30、高 DPI でも等倍で描く
const LIGHT_MOBILE: ParticleParams = { fps: '30', 'max-pixel-ratio': '1' }

// Profile は 1 画面に満たない短いセクションなので、箱いっぱいに敷く
export const PROFILE_PRESET: ParticlePreset = {
	// seed を書かないと load ごとに乱数で決まる (paramTable.ts の ensureSeed)。固定したい時だけ書く
	params: {
		// weekColors のときは types / colors を閲覧時の曜日テーマで上書きする (weekTypeColors)
		types: '7',
		count: '1600',
		force: '6.5',
		'draw-style': 'dots trail streak links mono dots dots',
		background: '#000000', // 曜日テーマ (Blueprint Contrast dark) の bg
		// 6 つのグリフを読めるだけの間。3 つの時は 0.9 秒で足りたが、2 段だと目で追う量が倍になる
		'hold-ms': '1200',
	},
	mobile: { ...LIGHT_MOBILE, force: '4' },
	mode: 'fill',
	weekColors: true,
	asterSpawn: true,
	night: true,
}
