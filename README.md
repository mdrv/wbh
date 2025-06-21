# 🔨 Web Browser Hard (WBH)

<p align="center">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mdrv/wbh/release.yml"/>
  <a href="https://www.npmjs.com/package/@mdrv/wbh">
    <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@mdrv/wbh"/>
  </a>
    <img alt="GitHub License" src="https://img.shields.io/github/license/mdrv/wbh">
</p>

Restrict access to your website from web browsers with(out) specific features.

>   [!CAUTION]
>   The API of this module is **rapidly changing** and is not intended for production or commercial use.
>
>   To suit your needs, forking is (mostly) necessary. You can expect the next major version (`v260`) to be **more stable**. 🌟

## 🎁 Features

-   📊 Pick from [50+ browser features](https://github.com/mdrv/wbh/wiki/feature-list) (more coming soon...)
-   🎛️ Customizable (set level, score and wisdom as you like)
-   🌲 Tree-shakeable (only import features you need)
-   🚀 Easy to use: comes with `mountError` function

## 📷 Screenshot

| Dark | Light |
| :--: | :---: |
| ![Example screenshot (dark mode, AVIF)](./res/example1-dark.avif) | ![Example screenshot (light mode, AVIF)](./res/example1-light.avif) |

>   [!NOTE]
>   If you can’t see the screenshot above, that means your browser does not support [AVIF image format](https://caniuse.com/avif)!

## 🧭 Examples

```ts
/* Import the main class, level (1–4) and feature items */
import {
  WBH,
  WBHLevel as L,
  avif,
  fileSystemApi,
  cssAspectRatio,
  /*...*/
} from '@mdrv/wbh'

const wbh = new WBH(
  [
    {
      feat: avif,
      level: L.CRITICAL,
      score: 50,
      wisdom: 'Most images hosted on this website are highly-optimized AVIF files.',
    },
    {
      feat: fileSystemApi,
      level: L.CRITICAL,
      score: 50,
      wisdom: 'Needed to store binary data locally in an organized manner.',
    },
    {
      feat: cssAspectRatio,
      level: L.CRITICAL,
      score: 49,
      wisdom:
      'There are layouts/containers that depend on aspect ratio of their surroundings.',
    },
    /*...*/
  ],
  /* Enable forceFail to enforce the lowest score */
  { forceFail: false },
)

const target = document.getElementById('__app__')

wbh.lastResultAsync.then((result) => {
  if (result.score >= 0) {
    /* Mount your actual app here! */
  } else {
    import('@mdrv/wbh/mount').then(({ mountError }) =>
      mountError(result, target, {
        /* You can customize footer with DOM element/Markdown */
        headerEl: 'Oops! :(',
        /* You can customize footer with Markdown */
        footerMd: '[Powered by **@mdrv/wbh**](https://github.com/mdrv/wbh)',
      })
    )
  }
})
```

## 🔔 Release Info

This package uses **Gregorian YYM-based** version system.

-   `v257` **(latest)**: Released on/before July 2025. 📅
-   `v260`: To be released on October–December 2025. 🚀

See [CHANGELOG](CHANGELOG.md) for breaking changes, updates and fixes.

## 💖 Thank You

This project is proudly using these libraries:

-   🎨 [**RE:DOM**](https://github.com/redom/redom) (the most versatile yet lightweight DOM library)
-   📑 [**Snarkdown**](https://github.com/developit/snarkdown) (a very minimalist Markdown-to-HTML library)
-   📚 Additional data: [**MDN**](https://github.com/mdn/browser-compat-data) and [**Can I use...**](https://github.com/Fyrd/caniuse)

<h6 align="center">© 2025 MEDRIVIA ／ Umar Alfarouk</h6>
