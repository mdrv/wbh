# CHANGELOG

## [v257.1] - 2025-06-21 (current)

### Added

-   You can now customize both header and footer (via `mountError`’s 3rd parameter).
    -   💡 Property names: `headerEl` (also accepts Markdown), `footerMd`
-   `v257.1.1`: You can now install via `npm i wbh` (experimental)

### Changed

-   Removed (slightly) the developer’s own branding.
-   A little change to how header is styled via CSS.
-   `v257.1.1`: Improved and slightly distinct docs (on both NPM and GitHub)
-   `v257.1.5`: Improved `exports` on package.json

### Fixed

-   You can import `mountError` directly from `@mdrv/wbh`
-   Enforce version to use on your project via import from `@mdrv/wbh/v257`
    -   💡 The next version `v260` might break the API, so you can keep the previous one.
-   `v257.1.6`: TypeScript when checking feature data (typo)

### Known Bugs

-   Several feature data don’t pass TypeScript checker.

## [v257.0] - 2025-06-21
 
**INITIAL RELEASE!** ⛅

Check out [the repo](https://github.com/mdrv/wbh) to know more about this project.
