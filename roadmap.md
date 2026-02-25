# WBH v260+ Roadmap

> Architecture assessment, upgrade plan, and vision for wbh as a browser feature pre-check library for web app developers.

---

## 1. Architecture Assessment

### 1.1 What Works Well

| Aspect                       | Verdict     | Notes                                                                                                                   |
| ---------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Feature-as-data model**    | Solid       | Each feature is a pure object with `fn()` detector + metadata. Easy to tree-shake, easy to test                         |
| **Sync/async dual path**     | Good design | `getResult()` skips async checks; `getResultAsync()` runs everything via `Promise.all`                                  |
| **Level-based scoring**      | Clean       | CRITICAL(0) > IMPORTANT(1) > OPTIONAL(2) > UNUSED(3). Score = `min(missing_level) - 1`. Simple and predictable          |
| **Data generation pipeline** | Smart       | `scripts/gen.ts` pulls from MDN BCD + caniuse-db to auto-populate version numbers. Single source of truth in `data0.ts` |
| **Tree-shakeable exports**   | Correct     | Named exports mean bundlers drop unused features                                                                        |
| **Zero runtime deps** (prod) | Good        | Only `es-toolkit` and `is-mobile` (and looking at usage, `is-mobile` isn't even imported in src)                        |
| **Test coverage**            | Adequate    | Covers error handling, async caching, forceFail                                                                         |

### 1.2 Architectural Issues to Fix

| Issue                                              | Location                            | Impact                                                                                                                        | Fix                                                                 |
| -------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **`score` field is accepted but unused**           | `types.ts:9`, `index.ts`            | Confusing API surface; users set `score` thinking it matters                                                                  | Remove `score` from `FeatureWithOpts` or implement weighted scoring |
| **`reason` field used but not typed**              | `data.ts:211` (`cssDetailsContent`) | Type mismatch with `GenericFeature`                                                                                           | Add `reason?` to `GenericFeature`                                   |
| **`css.ts` is orphaned**                           | `src/css.ts`                        | Exported but never imported/referenced from `index.ts`. Users must discover it separately                                     | Either integrate into WBH class or document as opt-in module        |
| **No detection cache**                             | `index.ts:31-89`                    | Every `getResult()` re-runs all `fn()` calls. Heavy for apps that check repeatedly                                            | Cache results per feature; invalidate on demand                     |
| **No preset/profile system**                       | N/A                                 | Every user must manually pick 50+ features with levels. High friction for adoption                                            | Ship curated presets (see Section 3)                                |
| **No browser version inference**                   | N/A                                 | Despite having full version data in every feature's `.data`, there's no utility to derive "min Chrome: 125, min Firefox: 123" | Add `inferMinimumVersions()` utility                                |
| **`forceFail` is crude**                           | `index.ts:102-103`                  | Binary on/off; no way to simulate specific missing features for testing                                                       | Add `mockUnsupported` option for dev/testing                        |
| **`GenericFeature.url` vs `data.url` duplication** | `types.ts:11`, `data.ts`            | Some features have `url` at top level, some only in `data`. Inconsistent                                                      | Normalize: single source of truth in `data`                         |
| **`is-mobile` dependency unused**                  | `package.json:47`                   | Listed as dependency but never imported in `src/`                                                                             | Remove                                                              |

### 1.3 Verdict

> **The core architecture is sound and doesn't need a rewrite.** The Feature-as-data pattern, dual sync/async path, and data generation pipeline are well-designed. The upgrades should be **additive**: fix the typing issues, remove dead code, add the missing infrastructure (caching, presets, version inference), then expand the feature catalog.

---

## 2. New Web Features to Add

### 2.1 HTML / DOM APIs

| Feature                              | Key Name                     | Detection                                                                                                | Chrome         | Firefox       | Priority  |
| ------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------- | -------------- | ------------- | --------- |
| `<dialog>` element                   | `htmlDialog`                 | `'HTMLDialogElement' in window`                                                                          | 37             | 98            | CRITICAL  |
| Popover API (already exists, verify) | `popover`                    | existing                                                                                                 | 114            | 125           | IMPORTANT |
| Declarative Shadow DOM               | `declarativeShadowDom`       | `document.createElement('div').attachShadow({ mode: 'open', delegatedFocus: true })` or HTML parse check | 111            | 123           | OPTIONAL  |
| `<search>` element                   | `searchElement`              | `'HTMLSearchElement' in window` (or `CSS.supports('selector(:search)')`)                                 | 123            | 128           | OPTIONAL  |
| Sanitizer API                        | `sanitizerApi`               | `'Sanitizer' in window`                                                                                  | 105            | —             | OPTIONAL  |
| `Element.toggleAttribute()`          | `toggleAttribute`            | `Element.prototype.toggleAttribute`                                                                      | 126 (long had) | 98 (long had) | LOW       |
| `setHTMLUnsafe` (already exists)     | `setHtmlUnsafe`              | existing                                                                                                 | 124            | 123           | OPTIONAL  |
| `Clipboard API`                      | `clipboardApi`               | `'clipboard' in navigator`                                                                               | 66             | 63            | OPTIONAL  |
| `Screen Wake Lock`                   | `wakeLockApi`                | `'wakeLock' in navigator`                                                                                | 119            | 126           | OPTIONAL  |
| `Web Share API`                      | `webShareApi`                | `'share' in navigator`                                                                                   | 61             | 81            | OPTIONAL  |
| `Badging API`                        | `badgingApi`                 | `'setAppBadge' in navigator`                                                                             | 81             | 89            | LOW       |
| `Notification API`                   | `notificationApi`            | `'Notification' in window`                                                                               | 32 (5)         | 22 (4)        | OPTIONAL  |
| `Reporting Observer`                 | `reportingObserver`          | `'ReportingObserver' in window`                                                                          | 69             | 78            | LOW       |
| `Performance Observer`               | `performanceObserver`        | `'PerformanceObserver' in window`                                                                        | 28             | 25            | OPTIONAL  |
| `IntersectionObserver v2`            | `intersectionObserverV2`     | Check `trackVisibility` option support                                                                   | 115            | —             | OPTIONAL  |
| `OffscreenCanvas`                    | `offscreenCanvas`            | `'OffscreenCanvas' in window`                                                                            | 69             | 105           | OPTIONAL  |
| `WebCodecs`                          | `webCodecs`                  | `'VideoDecoder' in window`                                                                               | 94             | 124           | LOW       |
| `WebGPU`                             | `webGpu`                     | `'navigator.gpu'`                                                                                        | 113            | —             | OPTIONAL  |
| `Scheduler API`                      | `schedulerApi`               | `'scheduler' in navigator`                                                                               | 94             | —             | LOW       |
| `EyeDropper API`                     | `eyeDropperApi`              | `'EyeDropper' in window`                                                                                 | 95             | —             | LOW       |
| `File System Access API (full)`      | `fileSystemAccessApi`        | `'showOpenFilePicker' in window`                                                                         | 86             | 111           | OPTIONAL  |
| `Capture Handle`                     | `captureHandle`              | `'CaptureHandle' in window` (or check API)                                                               | 102            | —             | LOW       |
| `Multi-Screen Window Placement`      | `multiScreenWindowPlacement` | `'getScreenDetails' in window`                                                                           | 101            | —             | LOW       |
| `Privacy Sandbox APIs`               | `privacySandboxAds`          | Check topics/attributions reporting availability                                                         | —              | —             | LOW       |

### 2.2 CSS Features

| Feature                                                 | Key Name                    | Detection                                                                                              | Chrome | Firefox | Priority             |
| ------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------- | -------------------- |
| CSS Nesting                                             | `cssNesting`                | `CSS.supports('selector(a { & b }))')` or try-parse                                                    | 120    | 117     | CRITICAL             |
| CSS `:has()` selector                                   | `cssHasSelector`            | `CSS.supports('selector(:has(*))')`                                                                    | 105    | 121     | CRITICAL             |
| CSS `@layer` (cascade layers)                           | `cssCascadeLayers`          | `CSS.supports('@layer foo')`                                                                           | 99     | 97      | IMPORTANT            |
| CSS `color-mix()`                                       | `cssColorMix`               | `CSS.supports('color', 'color-mix(in srgb, red, blue)')`                                               | 111    | 113     | IMPORTANT            |
| CSS `light-dark()`                                      | `cssLightDark`              | `CSS.supports('color', 'light-dark(red, blue)')`                                                       | 123    | 120     | IMPORTANT            |
| CSS `anchor-positioning`                                | `cssAnchorPositioning`      | `CSS.supports('anchor-name', '--a')`                                                                   | 125    | —       | OPTIONAL             |
| CSS `scroll-driven-animations`                          | `cssScrollDrivenAnimations` | `CSS.supports('animation-timeline', 'scroll()')`                                                       | 115    | —       | OPTIONAL             |
| CSS `field-sizing`                                      | `cssFieldSizing`            | `CSS.supports('field-sizing', 'content')`                                                              | 127    | —       | OPTIONAL             |
| CSS `view-transitions`                                  | `cssViewTransitions`        | CSS check or JS API check                                                                              | 111    | 129     | OPTIONAL (see below) |
| CSS `@property` (Houdini)                               | `cssProperty`               | `'CSS' in window && 'registerProperty' in (window.CSS ?? {})`                                          | 78     | 128     | OPTIONAL             |
| CSS `@container` style queries                          | `cssContainerStyleQueries`  | `CSS.supports('container-type', 'inline-size') && CSS.supports('@container style(font-weight: bold)')` | 117    | 130     | OPTIONAL             |
| CSS `text-wrap: pretty`                                 | `cssTextWrapPretty`         | `CSS.supports('text-wrap', 'pretty')`                                                                  | 114    | 121     | LOW                  |
| CSS `initial-letter`                                    | `cssInitialLetter`          | `CSS.supports('initial-letter', '2')`                                                                  | 110    | —       | LOW                  |
| CSS `::selection` styling                               | `cssSelection`              | `CSS.supports('selector(::selection)')`                                                                | 62     | 62      | LOW (ubiquitous)     |
| CSS `scrollbar-gutter`                                  | `cssScrollbarGutter`        | `CSS.supports('scrollbar-gutter', 'stable')`                                                           | 94     | 97      | OPTIONAL             |
| CSS `dvh/svh/lvh` units                                 | `cssViewportUnitVariants`   | `CSS.supports('height', '100dvh')`                                                                     | 108    | 101     | IMPORTANT            |
| CSS `:focus-visible`                                    | `cssFocusVisible`           | `CSS.supports('selector(:focus-visible)')`                                                             | 86     | 85      | IMPORTANT            |
| CSS `:modal` pseudo-class                               | `cssModalPseudo`            | `CSS.supports('selector(:modal)')`                                                                     | 105    | 103     | OPTIONAL             |
| CSS `@scope`                                            | `cssScope`                  | `CSS.supports('@scope')`                                                                               | 128    | 130     | OPTIONAL             |
| CSS `discrete transitions` transition-behavior (exists) | `cssTransitionBehavior`     | existing                                                                                               | 117    | 129     | OPTIONAL             |

### 2.3 JavaScript Features

| Feature                                          | Key Name               | Detection                                                        | Chrome                     | Firefox             | Priority                    |
| ------------------------------------------------ | ---------------------- | ---------------------------------------------------------------- | -------------------------- | ------------------- | --------------------------- |
| View Transitions API                             | `viewTransitions`      | `'startViewTransition' in document`                              | 111                        | 129                 | CRITICAL                    |
| `AbortSignal.timeout()`                          | `abortSignalTimeout`   | `'timeout' in AbortSignal`                                       | 114                        | 120                 | IMPORTANT                   |
| `AbortSignal.any()`                              | `abortSignalAny`       | `'any' in AbortSignal`                                           | 125                        | 129                 | IMPORTANT                   |
| `structuredClone`                                | `structuredClone`      | `'structuredClone' in self`                                      | 98                         | 94                  | IMPORTANT                   |
| `Array.at()`                                     | `arrayAt`              | `'at' in Array.prototype`                                        | 102                        | 122                 | IMPORTANT (ubiquitous soon) |
| `Array.with()`                                   | `arrayWith`            | `'with' in Array.prototype`                                      | 110                        | 115                 | IMPORTANT                   |
| `Array.toSpliced()/toReversed()/with()` group    | `arrayChangeMethods`   | Group check                                                      | 110                        | 115                 | IMPORTANT                   |
| `Array.fromAsync()`                              | `arrayFromAsync`       | `'fromAsync' in Array`                                           | 125                        | 131                 | OPTIONAL                    |
| `Promise.withResolvers()`                        | `promiseWithResolvers` | `'withResolvers' in Promise`                                     | 119                        | 129                 | IMPORTANT                   |
| `Iterator helpers`                               | `iteratorHelpers`      | Check `Iterator.prototype.map` or `Symbol.asyncIterator`         | 117                        | 136                 | OPTIONAL                    |
| `RegExp.escape()`                                | `regExpEscape`         | `'escape' in RegExp`                                             | 125                        | 131                 | OPTIONAL                    |
| `Promise.try`                                    | `promiseTry`           | `'try' in Promise`                                               | 125                        | 133                 | OPTIONAL                    |
| `Set operations` (intersection exists, add rest) | `setOperations`        | union, difference, symmetricDifference, isSubsetOf, isSupersetOf | 122                        | 127                 | IMPORTANT                   |
| `Map.groupBy()`                                  | `mapGroupBy`           | `'groupBy' in Map`                                               | 117                        | 130                 | OPTIONAL                    |
| `Object.groupBy()`                               | `objectGroupBy`        | `'groupBy' in Object`                                            | 117                        | 119                 | OPTIONAL                    |
| `WeakRef` / `FinalizationRegistry`               | `weakRef`              | `'WeakRef' in window`                                            | 84                         | 79                  | OPTIONAL                    |
| `Atomics` / `SharedArrayBuffer`                  | `atomics`              | `'Atomics' in self`                                              | 68                         | 78                  | OPTIONAL                    |
| `Import attributes` (with)                       | `importAttributes`     | Try dynamic import with `{ with: { type: 'json' } }`             | 123+ (behind flag)         | 137                 | OPTIONAL                    |
| `Temporal` (if Stage 3+)                         | `temporal`             | `'Temporal' in self`                                             | —                          | —                   | FUTURE (watch)              |
| `Decorators`                                     | `decorators`           | Check if stage 3 decorators parse                                | 124+ (behind flag stage 3) | 135+ (stage 3 flag) | FUTURE (watch)              |
| `Intl.Segmenter`                                 | `intlSegmenter`        | `'Segmenter' in Intl`                                            | 87                         | 121                 | OPTIONAL                    |
| `Intl.DurationFormat`                            | `intlDurationFormat`   | `'DurationFormat' in Intl`                                       | 122                        | 129                 | OPTIONAL                    |
| `URL.parse()`                                    | `urlParse`             | `'parse' in URL`                                                 | 131                        | 132                 | OPTIONAL                    |
| `FormData`formdata`event`                        | `formDataEvent`        | Check `FormData` event support                                   | 62                         | 58                  | LOW                         |
| `Symbols as WeakMap keys`                        | `symbolWeakMapKeys`    | Try `new WeakMap().set(Symbol(), 1)`                             | 123+                       | —                   | OPTIONAL                    |
| `JSON.parse source text access`                  | `jsonParseSource`      | Check if JSON.parse exposes source text                          | —                          | —                   | FUTURE                      |
| `ArrayBuffer.transfer()`                         | `arrayBufferTransfer`  | `'transfer' in ArrayBuffer`                                      | 130+                       | —                   | FUTURE                      |
| `ResizeObserver`box`option`                      | `resizeObserverBox`    | Check `box` option in ResizeObserver                             | 134+                       | —                   | OPTIONAL                    |

---

## 3. New Developer-Facing Features

### 3.1 Preset Profiles

The #1 friction point: users must hand-pick 50+ features with levels. Presets solve this.

```ts
import { WBH, presets } from '@mdrv/wbh'

// One-liner for common use cases
const wbh = new WBH(presets.modernWebApp())
// Equivalent to ~40 carefully chosen features at appropriate levels
```

| Preset                     | Target                                   | Includes                                                                                                                                                                |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modernWebApp()`           | SPAs built 2024+                         | AVIF, CSS Grid/Flexbox, Container Queries, View Transitions, ES2024+, Fetch+, IndexedDB, Custom Elements, Popover, `<dialog>`, CSS Nesting, `:has()`, Import Attributes |
| `progressiveEnhancement()` | Content sites that degrade gracefully    | Core layout (Grid, Flexbox), modern images (AVIF), basic ES2018+. Missing features = score penalty but not hard block                                                   |
| `cuttingEdge()`            | Demos/experiments                        | Everything including experimental flags (Anchor positioning, Scroll-driven animations, View timelines, WebGPU, Privacy Sandbox)                                         |
| `enterpriseLegacy()`       | Internal tools supporting older browsers | IE11-edge features only: ES5, basic CSS2.1, no modern APIs                                                                                                              |
| `pwa()`                    | Installable web apps                     | Service Worker APIs, Web App Manifest features, Badging, Wake Lock, Screen Controls, Share, File System Access                                                          |
| `mediaHeavy()`             | Video/audio/image editors                | WebCodecs, OffscreenCanvas, WebGPU, AVIF/JXL, FileSystem, Clipboard                                                                                                     |
| `minimal()`                | Bare minimum for any site                | Arrow functions, Promises, fetch/XHR, basic CSS (box-shadow, grid basics)                                                                                               |

Each preset returns `FeatureMod` (same type as manual config), so users can extend:

```ts
const wbh = new WBH([
	...presets.modernWebApp(),
	{ feat: webGpu, level: L.CRITICAL, wisdom: 'This app requires GPU compute.' },
])
```

### 3.2 Browser Version Inference

The most valuable derived insight from the feature dataset.

```ts
const wbh = new WBH(presets.modernApp())

// NEW: Infer minimum browser versions from selected features
const minVersions = wbh.inferMinimumVersions()
// {
//   chrome:        '125',
//   chrome_android: '125',
//   firefox:       '123',
//   firefox_android: '126',
//   safari:        '17.4',
//   edge:          '125',  // inferred from chrome
// }

// NEW: Compare against current browser
const comparison = wbh.compareBrowser()
// {
//   browser: 'chrome',
//   version: 120,
//   status: 'outdated',     // 'current' | 'outdated' | 'unsupported'
//   gap: 5,                 // versions behind minimum
//   missingCritical: [htmlDialog, viewTransitions],
//   missingOptional: [cssAnchorPositioning],
// }
```

Implementation: iterate `this.features`, collect max(version_added) per browser from `feature.data`, return the maximum (i.e., the version that satisfies ALL features).

### 3.3 Feature Knowledge API

Expose structured info about each feature for documentation, tooltips, and the eventual end-user screen.

```ts
import { getFeatureInfo } from '@mdrv/wbh'

const info = getFeatureInfo(viewTransitions)
// {
//   key: 'viewTransitions',
//   name: 'View Transitions API',
//   oneLiner: 'Smooth animated transitions between page/document states',
//   category: ['api', 'css'],
//   mdnUrl: 'https://developer.mozilla.org/...',
//   caniuseUrl: 'https://caniuse.com/mdn-api_document_startviewtransition',
//   browsers: { chrome: '111', firefox: '129', safari: '18.0', edge: '111' },
//   maturity: 'stable',         // 'experimental' | 'stable' | 'deprecated' | 'wont-fix'
//   alternatives: [             // what to use if unsupported
//     { name: 'Manual DOM swap', url: '...' },
//     { name: 'CSS page-transition (legacy)', url: '...' },
//   ],
//   polyfill: null,            // polyfill URL if available
//   estimatedGlobalSupport: 89, // percentage (from caniuse)
// }
```

This requires extending the `data` schema with `oneLiner`, `category`, `maturity`, `alternatives`, `polyfill`. The `gen.ts` script can pull some of this from caniuse (usage stats) and MDN (status).

### 3.4 Detection Cache

```ts
const wbh = new WBH(features, { cache: true })

// First call: runs all detectors
const r1 = await wbh.getResultAsync()

// Subsequent calls: returns cached result instantly
const r2 = await wbh.getResultAsync() // same reference, zero work

// Manual invalidation (e.g., after a feature flag change)
wbh.invalidateCache()
```

Implementation: store the resolved `Result` after first computation, return it on subsequent calls unless `invalidateCache()` is called.

### 3.5 Mock Mode for Testing

```ts
// Dev/test: simulate an outdated browser without actually using one
const wbh = new WBH(features, {
	mockUnsupported: [viewTransitions.key, htmlDialog.key],
})

const res = wbh.getResult()
res.score // -1 (as if those features were missing)
res.unsupported // contains viewTransitions + htmlDialog entries
```

### 3.6 Event System

```ts
const wbh = new WBH(features)

wbh.on('check:complete', (result) => {
	console.log(`Score: ${result.score}, ${result.unsupported.length} missing`)
})

wbh.on('feature:fail', (feature) => {
	analytics.track('browser_feature_missing', { feature: feature.key })
})

wbh.on('feature:pass', (feature) => {
	// optional telemetry
})
```

Lightweight pub/sub. Opt-in only (no overhead if not used). Useful for analytics integration.

---

## 4. Type System Overhaul

### 4.1 Current Issues

- `score` in `FeatureWithOpts` is misleading (unused in computation)
- `reason` on some features not in type
- `url` duplicated between `GenericFeature` and `data`
- No discriminative union for sync vs async features at the type level (rely on `isAsync` boolean)
- `caniuse` is `string | ReadonlyArray<string>` — always array internally would be cleaner

### 4.2 Proposed Types

```ts
// Base feature definition (what lives in data.ts)
export interface FeatureDefinition {
	readonly key: string
	readonly name: string
	readonly caniuse: readonly string[]
	readonly fn: (() => boolean) | (() => Promise<boolean>)
	readonly isSync: boolean // discriminative: true = fn returns boolean
	readonly reason?: string
}

// With browser compat data (generated by gen.ts)
export interface Feature extends FeatureDefinition {
	readonly data: {
		readonly origin: 'mdn' | 'caniuse'
		readonly chrome: string | false
		readonly firefox: string | false
		readonly chrome_android: string | false
		readonly firefox_android: string | false
		readonly title?: string
		readonly description?: string
		readonly url?: string
	}
}

// User configuration (passed to WBH constructor)
export interface FeatureConfig {
	readonly feat: Feature
	readonly level: WBHLevel
	readonly wisdom: string
}

export type FeatureMod = Array<
	FeatureConfig | [Feature, WBHLevel] | [Feature, Omit<FeatureConfig, 'feat'>]
>

// Result type (enriched)
export interface Result {
	readonly score: WBHLevel
	readonly unsupported: ReadonlyArray<Feature>
	readonly timestamp: number
	readonly durationMs: number
}

// Version inference output
export interface BrowserVersionMap {
	readonly chrome: string | null
	readonly firefox: string | null
	readonly safari: string | null
	readonly edge: string | null
}

// Browser comparison output
export interface BrowserComparison {
	readonly browser: string
	readonly version: number | null
	readonly status: 'current' | 'outdated' | 'unsupported' | 'unknown'
	readonly gap: number | null
	readonly missingCritical: ReadonlyArray<Feature>
	readonly missingOptional: ReadonlyArray<Feature>
}
```

Key changes:

- Removed `score` from user config
- Added `reason` to base type
- `caniuse` is always `readonly string[]`
- Added `timestamp` and `durationMs` to `Result`
- New types for version inference and browser comparison outputs

---

## 5. Build & Tooling Improvements

### 5.1 Generator Script (`scripts/gen.ts`) Enhancements

Current: pulls version numbers from MDN BCD + caniuse-db, injects into `data.ts`.

Upgrade to also pull:

- **Usage statistics** from caniuse (global support %)
- **Specification status** from MDN (baseline/limited/experimental/deprecated)
- **Polyfill links** from MDN (if available)
- **Safari/Edge versions** (currently only tracks Chrome + Firefox + Android variants)

### 5.2 Validation Layer

Add a post-generation validation step:

```ts
// After gen.ts runs, validate:
// - Every feature has non-false version for at least 1 browser
// - No duplicate keys
// - All caniuse slugs resolve
// - All MDN paths resolve
// - fn() is present and is a function
// - Async functions are correctly marked
```

### 5.3 Bundle Analysis

```bash
bun run analyze
# Outputs tree-shake report:
# - Individual feature sizes (minified + gzipped)
# - Preset bundle sizes
# - Full catalog size
# - Tree-shaking efficiency per bundler (vite/rollup/esbuild/webpack)
```

---

## 6. What to Present to Library Users

### 6.1 For the Developer Integrating WBH

| Deliverable                | Format                    | When                      |
| -------------------------- | ------------------------- | ------------------------- |
| **TypeScript types**       | Auto-generated `.d.ts`    | Always (existing)         |
| **JSDoc with examples**    | Inline in source          | Always (improve coverage) |
| **Preset catalog**         | Code + docs               | v260                      |
| **Version inference API**  | Method on WBH instance    | v260                      |
| **Feature knowledge API**  | `getFeatureInfo()` export | v261                      |
| **Migration guide**        | Wiki page                 | v260 release              |
| **Bundle size calculator** | CLI script / web tool     | v262                      |

### 6.2 For the End User (Via the Consumer App)

WBH itself doesn't talk to end users — the **consumer app** does, using data from WBH. Here's what WBH should provide to make that easy:

#### Data for the "Your browser is outdated" Screen

```ts
const wbh = new WBH(presets.modernWebApp())
const result = await wbh.getResultAsync()

// Rich data for rendering a block/update screen:
wbh.getReport() // NEW method
// {
//   score: -1,
//   status: 'blocked',
//
//   // For the heading
//   title: "Your browser doesn't support all required features",
//   subtitle: "Please update your browser to continue",
//
//   // Browser-specific update links
//   updateLinks: {
//     chrome: 'https://www.google.com/chrome/',
//     firefox: 'https://www.mozilla.org/firefox/new/',
//     safari: 'https://www.apple.com/safari/',
//     edge: 'https://www.microsoft.com/edge',
//   },
//   detectedBrowser: { name: 'chrome', version: 120 },
//
//   // Feature breakdown for the details section
//   criticalMissing: [
//     {
//       name: 'View Transitions API',
//       oneLiner: 'Smooth animated transitions between page states',
//       whyItMatters: 'Used for page navigation animations',
//       browsers: { chrome: '111+', firefox: '129+', safari: '18.0+' },
//       learnMore: 'https://developer.mozilla.org/...',
//       alternatives: [
//         { name: 'Manual DOM transitions', complexity: 'high' },
//       ],
//     },
//   ],
//   optionalMissing: [...],
//
//   // Quick facts
//   facts: {
//     totalFeaturesChecked: 42,
//     supportedCount: 39,
//     missingCount: 3,
//     estimatedUsersAffected: '2.3%',  // from caniuse usage stats
//     minimumChromeVersion: '125',
//     minimumFirefoxVersion: '123',
//   },
// }
```

This `getReport()` method is the **key bridge** between wbh as a dev tool and the end-user experience. The consumer app calls it and gets everything needed to render a polished block screen — without building that logic themselves.

#### Suggested End-User Messages (Templates)

WBH can provide i18n message templates that consumers can use or override:

```ts
// Built-in message templates (extensible)
wbh.messages = {
	blockedTitle: 'Browser Update Required',
	blockedSubtitle:
		'{{browser}} {{version}} is missing {{count}} required feature(s).',
	updateButton: 'Update {{browser}}',
	continueAnyway: 'Continue anyway (may break)',
	featureDetail: '{{name}} — {{oneLiner}} (needed since {{date}})',
	allSupported: 'Great! Your browser supports all required features.',
}
```

---

## 7. Implementation Phases

### Phase 1: Foundation (v260.0.x)

**Goal:** Fix architecture issues, improve DX, no breaking changes yet (or minimal).

- [ ] Remove unused `is-mobile` dependency
- [ ] Remove unused `score` field from types (or deprecate)
- [ ] Add `reason` to `GenericFeature` type
- [ ] Normalize `url` to live only in `data`
- [ ] Make `caniuse` always `readonly string[]`
- [ ] Integrate `css.ts` into index.ts exports (or document as separate module)
- [ ] Add detection cache (`cache` option + `invalidateCache()`)
- [ ] Add `mockUnsupported` option for testing
- [ ] Enrich `Result` with `timestamp` and `durationMs`
- [ ] Improve test coverage (add tests for presets when ready, cache behavior, mock mode)
- [ ] Update `gen.ts` to also pull Safari/Edge versions, usage %, spec status

### Phase 2: Feature Catalog Expansion (v260.1.x–v260.3.x)

**Goal:** Add all missing web features from Section 2.

- [ ] **Batch A — Critical gaps** (v260.1.0): `htmlDialog`, `viewTransitions`, `cssNesting`, `cssHasSelector`, `cssViewportUnitVariants`, `cssFocusVisible`, `cssCascadeLayers`, `cssColorMix`, `cssLightDark`, `abortSignalTimeout`, `abortSignalAny`, `structuredClone`, `arrayAt`, `arrayWith`, `arrayChangeMethods`, `promiseWithResolvers`, `setOperations` (full suite), `importAttributes`
- [ ] **Batch B — Important** (v260.2.0): `declarativeShadowDom`, `cssAnchorPositioning`, `cssScrollDrivenAnimations`, `cssScrollbarGutter`, `cssScope`, `cssContainerStyleQueries`, `clipboardApi`, `wakeLockApi`, `fileSystemAccessApi`, `webShareApi`, `intlSegmenter`, `intlDurationFormat`, `iteratorHelpers`, `regExpEscape`, `promiseTry`, `mapGroupBy`, `objectGroupBy`, `arrayFromAsync`, `urlParse`, `weakRef`, `resizeObserverBox`
- [ ] **Batch C — Nice to have** (v260.3.0): `sanitizerApi`, `searchElement`, `notificationApi`, `reportingObserver`, `performanceObserver`, `intersectionObserverV2`, `offscreenCanvas`, `webCodecs`, `webGpu`, `schedulerApi`, `eyeDropperApi`, `badgingApi`, `multiScreenWindowPlacement`, `captureHandle`, `cssFieldSizing`, `cssInitialLetter`, `cssTextWrapPretty`, `cssModalPseudo`, `cssProperty`, `atomics`, `symbolWeakMapKeys`, `formDataEvent`, `toggleAttribute`, `cssSelection`

### Phase 3: Developer Experience (v260.4.x–v260.6.x)

**Goal:** Presets, version inference, knowledge API.

- [ ] Implement preset system (`presets.modernWebApp()`, etc.) — v260.4.0
- [ ] Implement `inferMinimumVersions(): BrowserVersionMap` — v260.4.0
- [ ] Implement `compareBrowser(): BrowserComparison` — v260.5.0
- [ ] Implement `getFeatureInfo(fn): FeatureInfo` — v260.5.0
- [ ] Extend `data` schema with `oneLiner`, `category`, `maturity`, `alternatives`, `polyfill` — v260.5.0
- [ ] Update `gen.ts` to populate new fields — v260.5.0
- [ ] Implement lightweight event system (`on`/`off`) — v260.6.0
- [ ] Implement `getReport(): BlockReport` — v260.6.0
- [ ] Add i18n message template system — v260.6.0

### Phase 4: Polish & Ecosystem (v261.x+)

**Goal:** Tooling, docs, ecosystem integrations.

- [ ] Bundle size analyzer CLI/script
- [ ] Vite/Rollup plugin (`plugin-wbh`) that auto-detects features from your codebase
- [ ] CI GitHub Action: "Check browser compat on PR" — runs wbh against a matrix of browsers
- [ ] Playground: interactive demo where you toggle features and see the block screen
- [ ] Migration guide from v257 to v260
- [ ] Full JSDoc coverage with examples for every export
- [ ] Wiki: "Which preset should I use?" decision tree
- [ ] Auto-publish on feature release (when a browser ships a tracked feature, auto-update version data via scheduled GH Action)

---

## 8. Future Vision (Post-v261)

### 8.1 Static Analysis Integration

A Vite/Rollup plugin that scans your import/bundle output and auto-generates a WBH config:

```ts
// plugin-wbh detects you're using:
// - <dialog> → adds htmlDialog
// - viewTransition API → adds viewTransitions
// - CSS :has() → adds cssHasSelector
// - AVIF images → adds avif
// - startViewTransition → adds viewTransitions
// And outputs the optimal WBH config automatically
```

### 8.2 CI Browser Matrix

GitHub Action that runs your app's wbh config against real browsers (Browserstack / Playwright):

```yaml
# .github/workflows/wbh-check.yml
- uses: mdrv/wbh-action@v1
  with:
    config-path: src/wbh.config.ts
    browsers: "chrome-last-3,firefox-last-3,safari-last-2"
    fail-on-critical: true
```

### 8.3 Community Feature Registry

Allow publishing community feature definitions:

```ts
// @mdrv/wbh-features-threejs
export const webgl2 = { key: 'webgl2', fn: () => ..., data: {...} }
export const webgpu = { key: 'webgpu', fn: () => ..., data: {...} }
export const webxr = { key: 'webxr', fn: () => ..., data: {...} }
```

### 8.4 Telemetry Dashboard (Opt-in)

Anonymous aggregated data: which features are most commonly required, which browsers fail most often, real-world support gaps.

```ts
const wbh = new WBH(features, {
	telemetry: { endpoint: 'https://telemetry.wbh.dev/v1/event' }, // opt-in
})
```

---

## 9. Risk Assessment

| Risk                                               | Likelihood             | Impact | Mitigation                                                                 |
| -------------------------------------------------- | ---------------------- | ------ | -------------------------------------------------------------------------- |
| MDN BCD / caniuse-db schema changes break `gen.ts` | Medium                 | High   | Pin dependency versions; add schema validation; CI runs gen.ts on every PR |
| Feature detection false positives/negatives        | Medium                 | Medium | Test matrix across real browsers (Browserstack CI); community reports      |
| Catalog bloat (too many niche features)            | Low                    | Medium | Presets solve discovery; mark obscure features as `LOW` priority           |
| Breaking changes alienate existing users           | Low (v260 is explicit) | Medium | Clear migration guide; codemod script                                      |
| Maintainer burnout from catalog upkeep             | Medium                 | High   | Automate via CI (scheduled regen); accept community PRs for features       |

---

## 10. Summary

| Area                  | Action                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Architecture**      | Keep it. Fix types, remove dead fields, add cache. No rewrite needed.                  |
| **Feature catalog**   | ~60 new detections needed (from ~50 today to ~110+)                                    |
| **Presets**           | 7 presets cover 95% of use cases. Biggest DX improvement.                              |
| **Version inference** | Highest-value derived insight. Trivial to implement given existing data.               |
| **End-user bridge**   | `getReport()` gives consumers everything for a polished block screen.                  |
| **Timeline**          | Phase 1-2 (foundation + catalog) = v260. Phase 3 (DX) = v260.4-260.6. Phase 4 = v261+. |
