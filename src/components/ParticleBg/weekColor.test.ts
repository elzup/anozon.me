import { describe, expect, it } from 'vitest'
import { DAY_THEMES, THEME, weekTypeColors } from './weekColor'

// 2026-11-21 は土曜、2026-11-17 は火曜
const SATURDAY = new Date(2026, 10, 21)
const TUESDAY = new Date(2026, 10, 17)

describe('weekTypeColors', () => {
	it('0 番が今日の曜日色で、全種類が違う色', () => {
		const colors = weekTypeColors(SATURDAY)
		expect(colors[0]).toBe(DAY_THEMES[6]?.color)
		expect(colors).toHaveLength(7)
		expect(new Set(colors).size).toBe(colors.length)
	})

	it('曜日色とぶつかるテーマ色は外す', () => {
		const colors = weekTypeColors(TUESDAY)
		expect(colors).toHaveLength(6)
		expect(colors).not.toContain(THEME.red)
	})

	it('背景色は粒子に使わない', () => {
		DAY_THEMES.forEach((_, d) => expect(weekTypeColors(new Date(2026, 10, 15 + d))).not.toContain(THEME.bg))
	})
})
