# 🔨 Web Browser Hard (WBH)

<p align="center">
    <img src="res/logo.svg" width="180" height="180" /><br/>
</p>

<p align="center">
    <a href="https://github.com/mdrv/wbh/actions/workflows/release.yml">
        <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mdrv/wbh/release.yml?event=release"/>
    </a>
    <a href="https://www.npmjs.com/package/@mdrv/wbh">
        <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@mdrv/wbh"/>
    </a>
    <a href="https://github.com/mdrv/wbh/blob/master/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/mdrv/wbh">
    </a>
</p>

<p align="center">
    <b><i>Restrict access to your website from web browsers without specific features.</i></b>
</p>

> [!CAUTION]
> The API of this module is **rapidly changing** and is not intended for production or commercial use.
>
> To suit your specific needs, it's necessary to fork this project (with attribution). You can expect `v265`+ to be **more stable**. 🌟

## 🎁 Features

- 🧬 **Modular**: Use it on any framework (Svelte, Vue, etc.)
- 📊 **Versatile**: Pick from [70+ browser features](https://github.com/mdrv/wbh/wiki/feature-list) to check
- 🎛️ **Customizable**: Set metadata per-feature with levels, scores, and wisdom text
- 🌲 **Tree-shakeable**: Unused imports stay out of bundle
- 🚀 **Easy to use**: Comes with TypeScript types out of the box
- 📦 **Presets**: Ready-made profiles for common app types (modern web apps, SPAs, e-commerce, etc.)
- 🔍 **Version inference**: Infer minimum browser versions required by your feature set

Any question? Read [Q&A](https://github.com/mdrv/wbh/wiki/Q&A) on the wiki.

## 🧭 Example Code

### Basic usage

```ts
import {
	WBH,
	WBHLevel as L,
	avif,
	fileSystemApi,
	cssAspectRatio,
} from '@mdrv/wbh'

const wbh = new WBH([
	{
		feat: avif,
		level: L.CRITICAL,
		score: 50,
		wisdom: 'Most images are optimized AVIF.',
	},
	{
		feat: fileSystemApi,
		level: L.IMPORTANT,
		score: 50,
		wisdom: 'Needed for local binary storage.',
	},
	{
		feat: cssAspectRatio,
		level: L.OPTIONAL,
		score: 49,
		wisdom: 'Some layouts depend on aspect ratio.',
	},
])

const result = await wbh.getResultAsync()
if (result.score >= 0) {
	// Render your app
} else {
	// Browser missing features — show fallback UI
}
```

### Using presets

```ts
import { WBH, presets } from '@mdrv/wbh'

const wbh = new WBH(presets.modernWebApp())
const result = await wbh.getResultAsync()

console.log(result.unsupported.map((f) => f.name))
```

### Browser version inference

```ts
const wbh = new WBH(presets.modernWebApp())
await wbh.getResultAsync()

const versions = wbh.inferMinimumVersions()
// { chrome: "120", firefox: "121", safari: "17", edge: "120" }

const comparison = wbh.compareBrowser('firefox', 115)
// { browser: "firefox", version: 115, status: "outdated", gap: 6, ... }
```

### Options

```ts
new WBH(features, {
	cache: false, // opt-in: cache detection results (default off)
	mockUnsupported: false, // simulate all features unsupported (for testing)
})
```

## 🔔 Release Info

This package implements **Gregorian YYM-based** semver notation.

| Version    | Date         |
| ---------- | ------------ |
| `v257.x.x` | July 2025    |
| `v260.x.x` | Oct–Dec 2025 |
| `v265.x.x` | May 2026     |

See [CHANGELOG](https://github.com/mdrv/wbh/wiki/changelog) for full history.

---

<details>
<summary><strong>v265 Changelog</strong> (click to expand)</summary>

### Breaking Changes

- **Renamed** `forceFail` option → `mockUnsupported`
- **Removed** built-in CSS (`css.ts`) — handle your own fallback UI
- **Removed** `is-mobile` dependency
- **Updated** `Result` type: now includes `timestamp` and `durationMs` fields
- **Updated** feature data: each feature now includes `safari` and `edge` version fields

### New Features

- **Presets system** (`src/presets.ts`) — 7 ready-made profiles:
  - `modernWebApp()` — CSS nesting, grid, container queries, dialog, view transitions
  - `spa()` — Single-page app essentials (view transitions, navigation API, promises)
  - `contentSite()` — Content-focused sites (text-wrap, viewport units, typography)
  - `dataHeavy()` — Data-intensive apps (IndexedDB, WebSockets, structuredClone)
  - `cuttingEdge()` — Latest APIs (anchor positioning, scroll timeline, declarative shadow DOM)
  - `minimal()` — Bare minimum for basic compatibility
  - `ecommerce()` — E-commerce features (dialog modals, payment API, popover)
- **`inferMinimumVersions()`** — Returns min Chrome/Firefox/Safari/Edge versions needed
- **`compareBrowser(browser, version)`** — Compare a browser version against requirements; returns `current`, `outdated`, or `unsupported` status
- **Opt-in cache** via `{ cache: true }` option (default off to avoid stale results)
- **Enriched Result** — `timestamp` (Date.now()) and `durationMs` (performance.now())

### New Feature Detections (+20)

| Feature                | Level     | Notes                             |
| ---------------------- | --------- | --------------------------------- |
| `htmlDialog`           | CRITICAL  | `<dialog>` + showModal            |
| `viewTransitions`      | CRITICAL  | View Transitions API              |
| `cssNesting`           | CRITICAL  | CSS nesting syntax                |
| `cssHasSelector`       | CRITICAL  | `:has()` relational selector      |
| `structuredClone`      | CRITICAL  | Deep cloning without hacks        |
| `promiseWithResolvers` | CRITICAL  | Promise.withResolvers()           |
| `arrayAt`              | IMPORTANT | Array.at() negative indexing      |
| `arrayWith`            | IMPORTANT | Array.with() immutable mutation   |
| `cssColorMix`          | IMPORTANT | color-mix() function              |
| `viewportUnits`        | IMPORTANT | svh/lvh/dvh units                 |
| `cssFocusVisible`      | IMPORTANT | :focus-visible pseudo-class       |
| `navigationApi`        | IMPORTANT | Navigation API (Chrome/Edge only) |
| `urlPattern`           | IMPORTANT | URLPattern API                    |
| `cssAnchorPositioning` | OPTIONAL  | Anchor positioning (Chrome only)  |
| `declarativeShadowDom` | OPTIONAL  | Declarative Shadow DOM            |
| `promiseTry`           | OPTIONAL  | Promise.try()                     |
| `regexpEscape`         | OPTIONAL  | RegExp.escape()                   |
| `importAttributes`     | OPTIONAL  | Import attributes                 |

### Internal Improvements

- **gen.ts** now extracts Safari and Edge version data from MDN BCD + caniuse-db
- **types.ts** cleaned up: `caniuse` is `readonly string[]`, added `reason?`, `BrowserVersionMap`, `BrowserComparison`
- **dynamicImport** no longer references removed `is-mobile` dep
- Test suite expanded from 4 → 10 tests covering all new functionality

</details>

---

## 💖 Thank You

This project proudly uses:

- 🧩 [**es-toolkit**](https://github.com/toss/es-toolkit) (modern JS utilities with TypeScript support)
- 🥟 [**Bun.js**](https://github.com/oven-sh/bun) (blazing fast server-side JS runtime)
- 📚 Additional data: [**MDN**](https://github.com/mdn/browser-compat-data) and [**Can I use...**](https://github.com/Fyrd/caniuse)

<p align="center"><sub><strong>© 2025 MEDRIVIA ／ Umar Alfarouk</strong></sub></p>
