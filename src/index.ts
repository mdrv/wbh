export * from './data.ts'
export * as presets from './presets.ts'
import type {
	BrowserComparison,
	BrowserVersionMap,
	Feature,
	FeatureMod,
	Result,
	WBHLevel,
} from './types.ts'
import { Level, userLevel } from './level.ts'

const modifyDefaultFeatures = (featureMod: FeatureMod): Array<Feature> =>
	featureMod.reduce((prev: Array<Feature>, mod) => {
		if (Array.isArray(mod)) {
			prev.push({
				...mod[0],
				...(typeof mod[1] === 'number' ? { level: mod[1] } : mod[1]),
			})
		} else {
			const { feat, ...opts } = mod
			prev.push({ ...feat, ...opts })
		}
		return prev
	}, [])

// H: SYNC — async-enabled feature checks (such as JPEG XL) will be skipped!
const getResult = (features: Array<Feature>): Result => {
	const start = performance.now()
	let score: WBHLevel = Level.MAXIMUM

	const missingList = features
		.filter(({ isAsync, fn }) => {
			// H: SKIPPED async functions!
			if (isAsync) return false
			try {
				return !fn()
			} catch {
				return true
			}
		})
		.sort((a, b) => a.level - b.level)

	score = Math.min(
		missingList[0] ? missingList[0].level - 1 : Level.MAXIMUM,
		score,
	) as WBHLevel

	return {
		score,
		unsupported: missingList,
		timestamp: Date.now(),
		durationMs: performance.now() - start,
	}
}

const getResultAsync = async (features: Array<Feature>): Promise<Result> => {
	const start = performance.now()
	let score: WBHLevel = Level.MAXIMUM

	// H: Somehow filter() won't work inside promise.all
	const missingList = await Promise.all(
		features.map(async (feature) => {
			try {
				const supported = await feature.fn()
				return supported ? null : feature
			} catch {
				return feature
			}
		}),
	).then((results) => results.filter(Boolean) as Array<Feature>)

	missingList.sort((a, b) => a.level - b.level)

	score = Math.min(
		missingList[0] ? missingList[0].level - 1 : Level.MAXIMUM,
		score,
	) as WBHLevel

	return {
		score,
		unsupported: missingList,
		timestamp: Date.now(),
		durationMs: performance.now() - start,
	}
}

type WBHOptions = {
	cache?: boolean
	mockUnsupported?: boolean
}

class WBH {
	features: Array<Feature>
	#result?: Result
	#resultAsync?: Promise<Result>
	#options: Required<WBHOptions>

	constructor(featureMod: FeatureMod, options?: WBHOptions) {
		this.#options = {
			cache: false,
			mockUnsupported: false,
			...options,
		}
		this.features = modifyDefaultFeatures(featureMod)
	}

	getResult(): Result {
		if (this.#options.cache && this.#result) return this.#result

		if (this.#options.mockUnsupported) {
			this.#result = {
				score: Level.UNSUPPORTED as WBHLevel,
				unsupported: this.features,
				timestamp: Date.now(),
				durationMs: 0,
			}
		} else {
			this.#result = getResult(this.features)
		}
		return this.#result
	}

	async getResultAsync(): Promise<Result> {
		if (this.#options.cache && this.#result) return this.#result

		if (this.#options.mockUnsupported) {
			this.#result = {
				score: Level.UNSUPPORTED as WBHLevel,
				unsupported: this.features,
				timestamp: Date.now(),
				durationMs: 0,
			}
			this.#resultAsync = Promise.resolve(this.#result)
			return this.#result
		}

		if (this.#options.cache && this.#resultAsync) return this.#resultAsync

		this.#resultAsync = (async () => {
			const res = await getResultAsync(this.features)
			this.#result = res
			return res
		})()
		return this.#resultAsync
	}

	get lastResult(): Result {
		return this.#result ?? this.getResult()
	}

	get lastResultAsync(): Promise<Result> {
		return (
			this.#resultAsync ??
			(this.#result ? Promise.resolve(this.#result) : this.getResultAsync())
		)
	}

	get isCompatible(): boolean {
		return this.lastResult.score >= 0
	}

	async isCompatibleAsync(): Promise<boolean> {
		const result = await this.getResultAsync()
		return result.score >= 0
	}

	inferMinimumVersions(): BrowserVersionMap {
		const result = this.#result ?? this.getResult()
		const all = [...this.features, ...result.unsupported]

		let chrome: number | null = null
		let firefox: number | null = null
		let safari: number | null = null
		let edge: number | null = null

		for (const feat of all) {
			if (!feat.data) continue
			const d = feat.data
			if (d.chrome && d.chrome !== 'false') {
				const v = parseInt(d.chrome, 10)
				if (!isNaN(v) && (chrome === null || v > chrome)) chrome = v
			}
			if (d.firefox && d.firefox !== 'false') {
				const v = parseInt(d.firefox, 10)
				if (!isNaN(v) && (firefox === null || v > firefox)) firefox = v
			}
			if (d.safari && d.safari !== 'false') {
				const v = parseInt(d.safari, 10)
				if (!isNaN(v) && (safari === null || v > safari)) safari = v
			}
			if (d.edge && d.edge !== 'false') {
				const v = parseInt(d.edge, 10)
				if (!isNaN(v) && (edge === null || v > edge)) edge = v
			}
		}

		return {
			chrome: chrome !== null ? String(chrome) : null,
			firefox: firefox !== null ? String(firefox) : null,
			safari: safari !== null ? String(safari) : null,
			edge: edge !== null ? String(edge) : null,
		}
	}

	compareBrowser(browser: string, version: number): BrowserComparison {
		const result = this.#result ?? this.getResult()
		const versions = this.inferMinimumVersions()
		const key = browser.toLowerCase() as keyof BrowserVersionMap
		const required = versions[key] ? parseInt(versions[key]!, 10) : null

		let status: BrowserComparison['status'] = 'unknown'
		let gap: number | null = null

		if (required !== null) {
			if (version >= required) {
				status = 'current'
			} else if (version >= required - 5) {
				status = 'outdated'
				gap = required - version
			} else {
				status = 'unsupported'
				gap = required - version
			}
		}

		const missingCritical = result.unsupported.filter(
			(f) => f.level === Level.CRITICAL,
		)
		const missingOptional = result.unsupported.filter(
			(f) => f.level > Level.CRITICAL,
		)

		return {
			browser,
			version,
			status,
			gap,
			missingCritical,
			missingOptional,
		}
	}
}

export { getResult, getResultAsync, userLevel as WBHLevel, WBH }
export type { WBHOptions }
