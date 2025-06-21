# 🔨 Web Browser Hard (WBH)

Restrict access to your website from web browsers with(out) specific features.

>   [!CAUTION]
>   The API of this module is rapidly changing and is not intended for production use.

## Features

-   🎛️ Customizable (set level, score and wisdom as you like)
-   🌲 Tree-shakeable (only import features you need)
-   🚀 Easy to use (comes with error webpage mount function)

## Examples

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
  /* options */
  { forceFail: false },
)
```

## Release Info

This package uses Gregorian YYM-based versioning system (_ex. v257 = July 2025_).

See [CHANGELOG](CHANGELOG.md) for (future) breaking changes and fixes.

###### © 2025 Umar Alfarouk
