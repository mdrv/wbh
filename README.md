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
> To suit your specific needs, it’s necessary to fork this project (with attribution). You can expect the next major version (`v260`) to be **more stable**. 🌟

## 🎁 Features

- 🧬 **Modular**: You can use it on any framework (Svelte, Vue, etc.)
- 📊 **Versatile**: Pick from [50+ browser features](https://github.com/mdrv/wbh/wiki/feature-list) to get checked
- 🎛️ **Customizable**: Set metadata, header and footer as you like
- 🌲 **Tree-shakeable**: Unused imports stay out of bundle
- 🚀 **Easy to use**: Comes with TypeScript types

Any question? You can first read [Q&A](https://github.com/mdrv/wbh/wiki/Q&A) on the wiki.

## 🧭 Example Code

```ts
/* Import the main class, level (0–3) and feature items */
import {
	WBH,
	WBHLevel as L,
	avif,
	fileSystemApi,
	cssAspectRatio,
	/*...*/
} from '@mdrv/wbh'

/* Initialize the main class */
const wbh = new WBH(
	[
		{
			feat: avif,
			level: L.CRITICAL, // 0
			score: 50,
			wisdom:
				'Most images hosted on this website are highly-optimized AVIF files.',
		},
		{
			feat: fileSystemApi,
			level: L.IMPORTANT, // 1
			score: 50,
			wisdom: 'Needed to store binary data locally in an organized manner.',
		},
		{
			feat: cssAspectRatio,
			level: L.OPTIONAL, // 2
			score: 49,
			wisdom:
				'Some layouts/containers depend on aspect ratio of their surroundings.',
		},
		/*...*/
	],
	/* Enable forceFail to enforce the lowest score */
	{ forceFail: false },
)

/* Fetch the result and act based on score */
const target = document.getElementById('__app__')
/* Synchronous version (WBH.lastResult) will bypass async feature check */
wbh.lastResultAsync.then((result) => {
	if (result.score >= 0) {
		/* Render your actual app here! */
		/* mount(App, target) */
	} else {
		/* The browser (most likely) doesn’t support all feature. */
		/* console.dir(result) */
	}
})
```

## 🔔 Release Info

This package implements **Gregorian YYM-based** semver notation.

- 📅 `v257.x.x`: Released around/on July 2025.
- 🚀 `v260.x.x`: Released from October to December 2025. **(current)**

See [CHANGELOG](https://github.com/mdrv/wbh/wiki/changelog) for breaking changes, updates and fixes.

## 💖 Thank You

This project is proudly using these libraries:

- 🧩 [**es-toolkit**](https://github.com/toss/es-toolkit) (modern JS utilities with TypeScript support)
- 🥟 [**Bun.js**](https://github.com/oven-sh/bun) (blazing fast server-side JS runtime)
- 📚 Additional data: [**MDN**](https://github.com/mdn/browser-compat-data) and [**Can I use...**](https://github.com/Fyrd/caniuse)

<p align="center"><sub><strong>© 2025 MEDRIVIA ／ Umar Alfarouk</strong></sub></p>
