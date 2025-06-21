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
>   You can expect the next major version (`v260`) to be **much more stable**. 🌟

## Features

-   📊 Pick from [50+ browser features](wiki/Feature-list.md) (more coming soon...)
-   🎛️ Customizable (set level, score and wisdom as you like)
-   🌲 Tree-shakeable (only import features you need)
-   🚀 Easy to use: comes with `mountError` function

## Examples

![Example screenshot (dark mode, AVIF)](./res/example1-dark.avif#gh-dark-mode-only)
![Example screenshot (light mode, AVIF)](./res/example1-light.avif#gh-light-mode-only)

>   [!INFO]
>   If you can’t see the image, that means your browser does not support AVIF!

```ts
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
    /* Mount your actual app here. */
    /* ... */
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

## Release Info

This package uses Gregorian YYM-based versioning system (ex. _v257 = July 2025_).

See [CHANGELOG](CHANGELOG.md) for (future) breaking changes and fixes.

## Thanks

-   🎨 [RE:DOM (the most versatile and lightweight DOM library/helpers I’ve ever used)](https://github.com/redom/redom)
-   📑 [Snarkdown (a very minimalist Markdown-to-HTML library)](https://github.com/developit/snarkdown)
-   📚 [MDN](https://github.com/mdn/browser-compat-data) and [Can I use...](https://github.com/Fyrd/caniuse) for additional data

###### © 2025 MEDRIVIA ／ Umar Alfarouk
