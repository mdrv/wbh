# 🔨 Web Browser Hard (WBH)

Restrict access to your website from web browsers with(out) specific features.

>   [!CAUTION]
>   The API of this module is rapidly changing and is not intended for production use.

## Examples

```ts
import { WBH, WBHLevel as L } from '@mdrv/wbh/v256'
import {
  avif,
  fileSystemApi,
  cssAspectRatio,
  /*...*/
} from '@mdrv/wbh/data'

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

© 2025 Umar Alfarouk
