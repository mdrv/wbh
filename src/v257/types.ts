import { Level } from './level.ts'
export type WBHLevel = (typeof Level)[keyof typeof Level]

export type GenericFeature = {
	key: string
	name: string
	caniuse: string | ReadonlyArray<string>
	level?: number
    score?: number
	wisdom?: string
    url?: string
}

export type GenericFeatureWithFn = GenericFeature &
	(
		| { isAsync?: false; fn: () => boolean }
		| { isAsync: true; fn: () => Promise<boolean> }
	) & {
		data: {
            origin: 'mdn' | 'caniuse'
			chrome: string | boolean
			firefox: string | boolean
			chrome_android: string | boolean
			firefox_android: string | boolean
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
	| FeatureWithOpts
	| [GenericFeatureWithFn, WBHLevel | FeatureOpts]
>

export type Result = {
	score: WBHLevel
	unsupported: Array<Feature>
}
