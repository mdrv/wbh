import { it, expect } from 'bun:test'
import { WBH, WBHLevel as L } from '../src/index.ts'

const dataCommon = {
	origin: 'mdn',
	chrome: '1',
	chrome_android: '1',
	firefox: '1',
	firefox_android: '1',
}

it('sync throws are caught', () => {
	const throwingFeature = {
		key: 'throwing',
		name: 'Throwing',
		caniuse: 'unknown',
		level: L.CRITICAL,
		fn(): boolean {
			throw new Error('boom')
		},
		data: dataCommon,
	}

	const wbh = new WBH([{ feat: throwingFeature, level: L.CRITICAL, score: 10 }])
	const res = wbh.getResult()
	expect(res.score).toBe(-1)
})

it('async rejection is treated as unsupported', async () => {
	let invoked = 0
	const asyncFeature = {
		key: 'async-err',
		name: 'AsyncErr',
		caniuse: 'unknown',
		level: L.CRITICAL,
		isAsync: true as const,
		async fn() {
			invoked++
			throw new Error('boom')
		},
		data: dataCommon,
	}

	const wbh = new WBH([{ feat: asyncFeature, level: L.CRITICAL, score: 10 }])
	const res = await wbh.getResultAsync()

	expect(res.score).toBe(-1)
	expect(invoked).toBe(1)
})

it('lastResultAsync returns cached Promise and runs once', async () => {
	let invoked = 0
	const slowAsyncFeature = {
		key: 'slow',
		name: 'Slow',
		caniuse: 'unknown',
		level: L.OPTIONAL,
		isAsync: true as const,
		async fn() {
			invoked++
			await new Promise((r) => setTimeout(r, 20))
			return true
		},
		data: dataCommon,
	}

	const wbh = new WBH([
		{ feat: slowAsyncFeature, level: L.OPTIONAL, score: 10 },
	])
	const p1 = wbh.lastResultAsync
	const p2 = wbh.lastResultAsync
	expect(await p1).toEqual(await p2)
	const res = await p1
	expect(res.score).toBeGreaterThanOrEqual(0)
	expect(invoked).toBe(1)
})

it('forceFail enforces -1 for sync and async', async () => {
	const wbh = new WBH([], { forceFail: true })
	const res = wbh.getResult()
	expect(res.score).toBe(-1)
	const resAsync = await wbh.getResultAsync()
	expect(resAsync.score).toBe(-1)
})
