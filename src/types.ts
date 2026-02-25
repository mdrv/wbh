import { Level } from './level.ts'
export type WBHLevel = (typeof Level)[keyof typeof Level]

export type GenericFeature = {
	key: string
	name: string
	caniuse: readonly string[]
	level?: number
	score?: number
	wisdom?: string
	reason?: string
}

export type GenericFeatureWithFn = GenericFeature &
	(
		| { isAsync?: false; fn: () => boolean }
		| { isAsync: true; fn: () => Promise<boolean> }
	) & {
		data: {
			origin: 'mdn' | 'caniuse'
			chrome: string | false
			firefox: string | false
			chrome_android: string | false
			firefox_android: string | false
			safari: string | false
			edge: string | false
			title?: string
			description?: string
			url?: string
		}
	}

export type Feature = Required<Pick<GenericFeatureWithFn, 'level'>> &
	GenericFeatureWithFn

export type FeatureMap = Array<GenericFeatureWithFn>

type FeatureWithOpts = {
	feat: GenericFeatureWithFn
	level: WBHLevel
	score: number
	wisdom: string
}
type FeatureOpts = Omit<FeatureWithOpts, 'feat'>

export type FeatureMod = Array<
	FeatureWithOpts | [GenericFeatureWithFn, WBHLevel | FeatureOpts]
>

export type Result = {
	score: WBHLevel
	unsupported: Array<Feature>
	timestamp: number
	durationMs: number
}

export type BrowserVersionMap = {
	readonly chrome: string | null
	readonly firefox: string | null
	readonly safari: string | null
	readonly edge: string | null
}

export type BrowserComparison = {
	readonly browser: string
	readonly version: number | null
	readonly status: 'current' | 'outdated' | 'unsupported' | 'unknown'
	readonly gap: number | null
	readonly missingCritical: ReadonlyArray<Feature>
	readonly missingOptional: ReadonlyArray<Feature>
}
