// <particle-life-bg> の属性セット。キーは属性名そのまま (attributes.js の attr)
export type ParticleParams = Record<string, string>

export type ParticlePreset = {
	// count は 1440x900 の画面での粒子数。実際は箱の面積に比例させる (responsive.ts)
	params: ParticleParams
	// 幅 768px 未満でだけ上書きする属性 (force や fps など)
	mobile?: ParticleParams
	// 置き方の上書き。未指定ならそのスロットの既定 (TopPage 側) に従う
	mode?: 'fill' | 'sticky' | 'gutter'
}

// screen は Profile〜Footer をまとめて包む (左右余白の gutter 用)
export type ParticleSlot = 'eyecatch' | 'profile' | 'works' | 'hobby' | 'screen'

// スマホは描画負荷を下げる: fps 30、高 DPI でも等倍で描く
const LIGHT_MOBILE: ParticleParams = { fps: '30', 'max-pixel-ratio': '1' }

// Profile は 1 画面に満たない短いセクションなので、箱いっぱいに敷く
export const PROFILE_PRESET: ParticlePreset = {
	params: {
		types: '7',
		count: '1600',
		seed: '18762',
		force: '6.5',
		'draw-style': 'glow trail streak links mono dots dots',
		scheme: 'gray',
		background: '#f2f2f2',
	},
	mobile: { ...LIGHT_MOBILE, force: '4' },
	mode: 'fill',
}
