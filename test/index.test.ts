import { it, expect } from 'bun:test'
import { WBH, WBHLevel as L, presets } from '../src/index.ts'

const dataCommon = {
	origin: 'mdn' as const,
	chrome: '1',
	chrome_android: '1',
	firefox: '1',
	firefox_android: '1',
	safari: '1',
	edge: '1',
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

it('mockUnsupported enforces -1 for sync and async', async () => {
	const wbh = new WBH([], { mockUnsupported: true })
	const res = wbh.getResult()
	expect(res.score).toBe(-1)
	const resAsync = await wbh.getResultAsync()
	expect(resAsync.score).toBe(-1)
})

it('result includes timestamp and durationMs', () => {
	const wbh = new WBH([])
	const res = wbh.getResult()
	expect(res.timestamp).toBeGreaterThan(0)
	expect(res.durationMs).toBeGreaterThanOrEqual(0)
})

it('cache option returns same result on repeated calls', () => {
	const feature = {
		key: 'always-pass',
		name: 'AlwaysPass',
		caniuse: 'unknown',
		level: L.CRITICAL,
		fn: () => true,
		data: dataCommon,
	}
	const wbh = new WBH([{ feat: feature, level: L.CRITICAL, score: 10 }], {
		cache: true,
	})
	const r1 = wbh.getResult()
	const r2 = wbh.getResult()
	expect(r1).toBe(r2)
})

it('without cache, getResult returns fresh result', () => {
	let calls = 0
	const feature = {
		key: 'counter',
		name: 'Counter',
		caniuse: 'unknown',
		level: L.CRITICAL,
		fn: () => {
			calls++
			return true
		},
		data: dataCommon,
	}
	const wbh = new WBH([{ feat: feature, level: L.CRITICAL, score: 10 }])
	wbh.getResult()
	wbh.getResult()
	expect(calls).toBe(2)
})

it('inferMinimumVersions returns highest required versions', () => {
	const feat1 = {
		key: 'f1',
		name: 'F1',
		caniuse: 'unknown',
		level: L.CRITICAL,
		fn: () => true,
		data: {
			...dataCommon,
			chrome: '100',
			firefox: '90',
			safari: '16',
			edge: '100',
		},
	}
	const feat2 = {
		key: 'f2',
		name: 'F2',
		caniuse: 'unknown',
		level: L.IMPORTANT,
		fn: () => true,
		data: {
			...dataCommon,
			chrome: '120',
			firefox: '110',
			safari: '17',
			edge: '120',
		},
	}
	const wbh = new WBH([
		{ feat: feat1, level: L.CRITICAL, score: 10 },
		{ feat: feat2, level: L.IMPORTANT, score: 8 },
	])
	wbh.getResult()
	const versions = wbh.inferMinimumVersions()
	expect(versions.chrome).toBe('120')
	expect(versions.firefox).toBe('110')
	expect(versions.safari).toBe('17')
	expect(versions.edge).toBe('120')
})

it('compareBrowser returns correct status', () => {
	const feat = {
		key: 'f1',
		name: 'F1',
		caniuse: 'unknown',
		level: L.CRITICAL,
		fn: () => true,
		data: {
			...dataCommon,
			chrome: '120',
			firefox: '110',
			safari: '17',
			edge: '120',
		},
	}
	const wbh = new WBH([{ feat: feat, level: L.CRITICAL, score: 10 }])
	wbh.getResult()

	const current = wbh.compareBrowser('chrome', 125)
	expect(current.status).toBe('current')
	expect(current.gap).toBeNull()

	const outdated = wbh.compareBrowser('chrome', 118)
	expect(outdated.status).toBe('outdated')
	expect(outdated.gap).toBe(2)

	const unsupported = wbh.compareBrowser('chrome', 100)
	expect(unsupported.status).toBe('unsupported')
	expect(unsupported.gap).toBe(20)
})

it('presets return valid FeatureMod arrays', () => {
	const preset = presets.modernWebApp()
	expect(preset.length).toBeGreaterThan(0)
	const wbh = new WBH(preset)
	const res = wbh.getResult()
	expect(res.score).toBeDefined()
})
