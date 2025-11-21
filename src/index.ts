export * from './data.ts'
import type {
	FeatureMod,
	FeatureMap,
	Feature,
	Result,
	WBHLevel,
} from './types.ts'
import { userLevel, Level } from './level.ts'

const modifyDefaultFeatures = (featureMod: FeatureMod): Array<Feature> =>
	featureMod.reduce((prev: Array<Feature>, mod) => {
		// FeatureWithOpts
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

/**
 * SYNC version of getResult function
 *
 * @remarks Async-enabled feature checks (such as JPEG XL) will be skipped!
 */
const getResult: (features: Array<Feature>) => Result = (features) => {
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
	const unsupported: Array<Feature> = missingList

	return {
		score,
		unsupported,
	}
}

/**
 * ASYNC version of getResult function
 *
 */
const getResultAsync: (features: Array<Feature>) => Promise<Result> = async (
	features,
) => {
	let score: WBHLevel = Level.MAXIMUM

	// H: Somehow filter() won’t work inside promise.all
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

	score = Math.min(
		missingList[0] ? missingList[0].level - 1 : Level.MAXIMUM,
		score,
	) as WBHLevel
	const unsupported: Array<Feature> = missingList

	return {
		score,
		unsupported,
	}
}

/**
 * The main class of WBH (web browser hardener/restriction) module.
 *
 * @remarks Only SYNC version is implemented, atm.
 */
class WBH {
	features: Array<Feature>
	#result?: Result
	#resultAsync?: Promise<Result>
	#options: { forceFail: boolean }

	constructor(featureMod: FeatureMod, options?: { forceFail: boolean }) {
		this.#options = options ?? { forceFail: false }
		this.features = modifyDefaultFeatures(featureMod)
	}

	getResult(): Result {
		this.#result = this.#options.forceFail
			? {
					score: -1,
					unsupported: this.features,
				}
			: getResult(this.features)
		return this.lastResult
	}

	async getResultAsync(): Promise<Result> {
		if (this.#resultAsync) return this.#resultAsync
		if (this.#options.forceFail) {
			this.#result = {
				score: -1,
				unsupported: this.features,
			}
			this.#resultAsync = Promise.resolve(this.#result)
			return this.#result
		}
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
		const result = this.lastResult
		return result.score >= 0
	}

	async isCompatibleAsync(): Promise<boolean> {
		const result = await this.getResultAsync()
		return result.score >= 0
	}
}

export { getResult, getResultAsync, userLevel as WBHLevel, WBH }
