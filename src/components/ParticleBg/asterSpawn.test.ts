import { describe, expect, it } from 'vitest'
import { createAsterSpawn, samplePattern, utcPatterns } from './asterSpawn'

// 再現できるよう固定の疑似乱数 (線形合同法)
const lcg = (seed: number) => {
	let s = seed
	return () => {
		s = (s * 1664525 + 1013904223) % 2 ** 32
		return s / 2 ** 32
	}
}

describe('utcPatterns', () => {
	it('上の段は年 (下 2 桁)・月・日、下の段は時・分・秒を 0〜255 に写す', () => {
		const now = new Date(Date.UTC(2099, 0, 31, 23, 0, 59))
		expect(utcPatterns(now)).toEqual([
			[255, 0, 255],
			[255, 0, 255],
		])
		expect(samplePattern(30, 59)).toBe(130)
	})
})

describe('createAsterSpawn', () => {
	const ctx = { count: 1000, types: 7, aspect: 16 / 9 }

	it('粒子の 7 割ほどをグリフに使い、全点が画面内 (0〜1) に入る', () => {
		const points = createAsterSpawn(new Date(Date.UTC(2026, 10, 22, 12, 34, 56)), lcg(1))(ctx)
		expect(points.length).toBeGreaterThan(600)
		expect(points.length).toBeLessThanOrEqual(ctx.count)
		points.forEach((p) => {
			expect(p.x).toBeGreaterThanOrEqual(0)
			expect(p.x).toBeLessThanOrEqual(1)
			expect(p.y).toBeGreaterThanOrEqual(0)
			expect(p.y).toBeLessThanOrEqual(1)
		})
	})

	it('縦長の画面でも 6 つのグリフがはみ出さない', () => {
		const points = createAsterSpawn(new Date(Date.UTC(2026, 10, 22, 23, 59, 59)), lcg(2))({ ...ctx, aspect: 0.5 })
		const xs = points.map((p) => p.x)
		expect(Math.min(...xs)).toBeGreaterThan(0)
		expect(Math.max(...xs)).toBeLessThan(1)
	})

	it('全部 off (2000-01-01 00:00:00) でも中心の点だけは置く', () => {
		const points = createAsterSpawn(new Date(Date.UTC(2000, 0, 1, 0, 0, 0)), lcg(3))(ctx)
		expect(points.length).toBeGreaterThan(0)
		expect(points.every((p) => p.type === 0)).toBe(true)
	})
})
