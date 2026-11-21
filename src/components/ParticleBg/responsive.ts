import type { ParticleParams } from './presets'

// preset の count はこの面積 (一般的なノート PC の画面) での粒子数として書く
const REFERENCE_AREA = 1440 * 900
// 小さい箱でも群れが見える下限
const MIN_COUNT = 150
// これ未満の幅をスマホとみなし preset.mobile を上書きする
const MOBILE_MAX_WIDTH = 768

/** 面積に比例させて密度を保つ。大画面では preset の値を上限にして重くしない */
export const scaleCount = (baseCount: number, area: number): number => {
	const scaled = Math.round((baseCount * area) / REFERENCE_AREA)
	return Math.min(baseCount, Math.max(MIN_COUNT, scaled))
}

const parseMobile = (raw: string | undefined): ParticleParams => {
	if (raw === undefined || raw === '') return {}
	try {
		return JSON.parse(raw) as ParticleParams
	} catch (error) {
		console.error('[ParticleBg] data-mobile が JSON ではない', error)
		return {}
	}
}

export const applyResponsive = (el: HTMLElement): void => {
	const baseCount = Number(el.dataset.baseCount)
	const isMobile = window.innerWidth < MOBILE_MAX_WIDTH
	const overrides = isMobile ? parseMobile(el.dataset.mobile) : {}
	const area = el.clientWidth * el.clientHeight

	if (Number.isFinite(baseCount) && area > 0) {
		el.setAttribute('count', String(scaleCount(baseCount, area)))
	}
	Object.entries(overrides).forEach(([attr, value]) => el.setAttribute(attr, value))
}
