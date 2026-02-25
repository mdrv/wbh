/**
 * @deprecated Not gonna work with Rollup (function became !0)
 * A must in web development!
 * Should always return true, anyway.
 *
 * i: Should be supported across ES6+ browsers
 * l: https://caniuse.com/arrow-functions
 */
export const arrowFunction = {
	data: {
		origin: 'caniuse',
		title: 'Arrow functions',
		description:
			'Function shorthand using `=>` syntax and lexical `this` binding.',
		chrome: '45',
		chrome_android: '148',
		firefox: '22',
		firefox_android: '150',
		safari: '10',
		edge: '12',
		url: 'https://caniuse.com/arrow-functions',
	},
	key: 'arrowFunction',
	name: 'Arrow functions',
	caniuse: 'arrow-functions',
	fn: function (): boolean {
		try {
			;(() => {})()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * @deprecated Not sure which module to import that does not decrease size (svelte: 12KB)
 * A must in web development!
 * Should always return true, anyway.
 *
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
 * l: https://caniuse.com/es6-module-dynamic-import
 */
export const dynamicImport = {
	data: {
		origin: 'caniuse',
		title: 'JavaScript modules: dynamic import()',
		description:
			'Loading JavaScript modules dynamically using the import() syntax',
		chrome: '63',
		chrome_android: '148',
		firefox: '67',
		firefox_android: '150',
		safari: '12',
		edge: '79',
		url: 'https://caniuse.com/es6-module-dynamic-import',
	},
	key: 'dynamicImport',
	name: 'Dynamic imports',
	caniuse: 'es6-module-dynamic-import',
	fn: (): boolean => {
		try {
			new Function('return import("data:text/javascript,")')
			return true
		} catch {
			return false
		}
	},
} as const

/**
 * To check browser type and version.
 *
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
 */
export const userAgent = {
	data: {
		origin: 'mdn',
		chrome: '1',
		chrome_android: '18',
		firefox: '1',
		firefox_android: '4',
		safari: '1',
		edge: '12',
		url: 'https://developer.mozilla.org/docs/Web/API/Navigator/userAgent',
	},
	key: 'userAgent',
	name: 'Navigator.userAgent',
	caniuse: ['api', 'Navigator', 'userAgent'],
	fn: (): boolean => {
		return 'userAgent' in navigator
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 * l: https://caniuse.com/mdn-api_indexeddb
 */
export const indexedDb = {
	data: {
		origin: 'caniuse',
		title: 'IndexedDB 2.0',
		description:
			'Improvements to Indexed DB, including getAll(), renaming stores and indexes, and binary keys.',
		chrome: '58',
		chrome_android: '148',
		firefox: '51',
		firefox_android: '150',
		safari: '11',
		edge: '79',
		url: 'https://caniuse.com/indexeddb2',
	},
	key: 'indexedDb',
	name: 'IndexedDB API',
	caniuse: 'indexeddb2',
	fn: (): boolean => {
		return 'indexedDB' in window && 'getAll' in IDBObjectStore.prototype
	},
} as const

/**
 * H: This feature is available only in secure contexts (HTTPS)
 * H: Safari ≤ 26 cannot execute createWritable()!
 * l: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system
 * l: https://web.dev/articles/origin-private-file-system
 * l: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createWritable
 */
export const fileSystemApi = {
	data: {
		origin: 'mdn',
		chrome: '86',
		chrome_android: '109',
		firefox: '111',
		firefox_android: '111',
		safari: '15.2',
		edge: '86',
		url: 'https://developer.mozilla.org/docs/Web/API/StorageManager/getDirectory',
	},
	key: 'fileSystemApi',
	name: 'FileSystem API',
	caniuse: ['api', 'StorageManager', 'getDirectory'],
	fn: (): boolean => {
		return (
			'storage' in navigator &&
			Object.hasOwn(FileSystemFileHandle.prototype, 'createWritable')
		)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements
 * l: https://caniuse.com/custom-elementsv1
 */
export const customElements = {
	data: {
		origin: 'caniuse',
		title: 'Custom Elements (V1)',
		description:
			'One of the key features of the Web Components system, custom elements allow new HTML tags to be defined.',
		chrome: '67',
		chrome_android: '148',
		firefox: '63',
		firefox_android: '150',
		safari: false,
		edge: '79',
		url: 'https://caniuse.com/custom-elementsv1',
	},
	key: 'customElements',
	name: 'Custom Elements',
	caniuse: 'custom-elementsv1',
	fn: (): boolean => {
		return 'customElements' in window
	},
} as const

/**
 * Easier way of stating top-right-bottom-left CSS properties.
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
 */
export const cssInset = {
	data: {
		origin: 'mdn',
		chrome: '87',
		chrome_android: '87',
		firefox: '66',
		firefox_android: '66',
		safari: '14.1',
		edge: '87',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/inset',
	},
	key: 'cssInset',
	name: 'CSS inset',
	caniuse: ['css', 'properties', 'inset'],
	fn: (): boolean => {
		return CSS.supports('inset', '0')
	},
} as const

/**
 * l: https://nerdy.dev/open-and-close-transitions-for-the-details-element
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content
 * H: No support on Firefox v138
 * H: Not working on Lemur Browser
 */
export const cssDetailsContent = {
	data: {
		origin: 'mdn',
		chrome: '131',
		chrome_android: '131',
		firefox: '143',
		firefox_android: '143',
		safari: '18.4',
		edge: '131',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/::details-content',
	},
	key: 'cssDetailsContent',
	name: 'CSS ::details-content',
	caniuse: ['css', 'selectors', 'details-content'],
	fn: (): boolean => {
		return CSS.supports('selector(::details-content)')
	},
	reason: 'Enables styling and animation inside details tag.',
} as const

/**
 * Very standard by 2025
 */
export const cssMathFunctions = {
	data: {
		origin: 'caniuse',
		title: 'CSS math functions min(), max() and clamp()',
		description:
			'More advanced mathematical expressions in addition to `calc()`',
		chrome: '79',
		chrome_android: '148',
		firefox: '75',
		firefox_android: '150',
		safari: '14',
		edge: '79',
		url: 'https://caniuse.com/css-math-functions',
	},
	key: 'cssMathFunctions',
	name: 'CSS math functions',
	caniuse: 'css-math-functions',
	fn: (): boolean => {
		return (
			CSS.supports('width', 'min(50vw, 200px)') &&
			CSS.supports('width', 'max(50vw, 200px)') &&
			CSS.supports('width', 'clamp(1rem, 2.5vw, 2rem)')
		)
	},
} as const

/**
 * H: Kiwi Browser won’t render __pseudo-dialog box-shadow, but it works in other websites???
 */
export const cssBoxShadow = {
	data: {
		origin: 'caniuse',
		title: 'CSS3 Box-shadow',
		description:
			'Method of displaying an inner or outer shadow effect to elements',
		chrome: '10',
		chrome_android: '148',
		firefox: '4',
		firefox_android: '150',
		safari: '6',
		edge: '12',
		url: 'https://caniuse.com/css-boxshadow',
	},
	key: 'cssBoxShadow',
	name: 'CSS box-shadow',
	caniuse: 'css-boxshadow',
	fn: (): boolean => {
		return CSS.supports('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.2)')
	},
} as const

/**
 */
export const cssGrid = {
	data: {
		origin: 'caniuse',
		title: 'CSS Grid Layout (level 1)',
		description:
			'Method of using a grid concept to lay out content, providing a mechanism for authors to divide available space for layout into columns and rows using a set of predictable sizing behaviors. Includes support for all `grid-*` properties and the `fr` unit.',
		chrome: '58',
		chrome_android: '148',
		firefox: '54',
		firefox_android: '150',
		safari: '11',
		edge: '16',
		url: 'https://caniuse.com/css-grid',
	},
	key: 'cssGrid',
	name: 'CSS grid',
	caniuse: 'css-grid',
	fn: (): boolean => {
		return (
			CSS.supports('grid-template-columns', '1fr') &&
			CSS.supports('grid-template-areas', '"a a ." "a a ." ". b c"')
		)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
 */
export const cssAspectRatio = {
	data: {
		origin: 'mdn',
		chrome: '88',
		chrome_android: '88',
		firefox: '89',
		firefox_android: '89',
		safari: '15',
		edge: '88',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/aspect-ratio',
	},
	key: 'cssAspectRatio',
	name: 'CSS aspect-ratio',
	caniuse: ['css', 'properties', 'aspect-ratio'],
	fn: (): boolean => {
		return CSS.supports('aspect-ratio', '1/1')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/container-type
 */
export const cssContainerType = {
	data: {
		origin: 'mdn',
		chrome: '105',
		chrome_android: '105',
		firefox: '110',
		firefox_android: '110',
		safari: '16',
		edge: '105',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type',
	},
	key: 'cssContainerType',
	name: 'CSS container-type',
	caniuse: ['css', 'properties', 'container-type'],
	fn: (): boolean => {
		return CSS.supports('container-type', 'inline-size')
	},
} as const

/**
 * l: https://caniuse.com/css-subgrid
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
 */
export const cssSubgrid = {
	data: {
		origin: 'caniuse',
		title: 'CSS Subgrid',
		description:
			'Feature of the CSS Grid Layout Module Level 2 that allows a grid-item with its own grid to align in one or both dimensions with its parent grid.',
		chrome: '117',
		chrome_android: '148',
		firefox: '71',
		firefox_android: '150',
		safari: '16.0',
		edge: '117',
		url: 'https://caniuse.com/css-subgrid',
	},
	key: 'cssSubgrid',
	name: 'CSS subgrid',
	caniuse: 'css-subgrid',
	fn: (): boolean => {
		return CSS.supports('grid-template-columns', 'subgrid')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 128 (Released 2024-08-20)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-align
 */
export const cssRubyAlign = {
	data: {
		origin: 'mdn',
		chrome: '128',
		chrome_android: '128',
		firefox: '38',
		firefox_android: '38',
		safari: '18.2',
		edge: '128',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align',
	},
	key: 'cssRubyAlign',
	name: 'CSS ruby-align',
	caniuse: ['css', 'properties', 'ruby-align'],
	fn: (): boolean => {
		return CSS.supports('ruby-align', 'space-around')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 114 (Released 2023-05-30)
 * H: JUST RELEASED: Firefox 124 (Released 2024-03-19)
 * H: JUST RELEASED: Safari 17.5 (Released 2024-05-13)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
 */
export const cssTextWrap = {
	data: {
		origin: 'mdn',
		chrome: '114',
		chrome_android: '114',
		firefox: '121',
		firefox_android: '121',
		safari: '17.4',
		edge: '114',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap',
	},
	key: 'cssTextWrap',
	name: 'CSS text-wrap',
	caniuse: ['css', 'properties', 'text-wrap'],
	fn: (): boolean => {
		return CSS.supports('text-wrap', 'balance')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline
 */
export const cssDominantBaseline = {
	data: {
		origin: 'mdn',
		chrome: '1',
		chrome_android: '18',
		firefox: '1',
		firefox_android: '4',
		safari: '4',
		edge: '79',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline',
	},
	key: 'cssDominantBaseline',
	name: 'CSS dominant-baseline',
	caniuse: ['css', 'properties', 'dominant-baseline'],
	fn: (): boolean => {
		return CSS.supports('dominant-baseline', 'middle')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 */
export const cssFilter = {
	data: {
		origin: 'mdn',
		chrome: '53',
		chrome_android: '53',
		firefox: '35',
		firefox_android: '35',
		safari: '9.1',
		edge: '12',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter',
	},
	key: 'cssFilter',
	name: 'CSS filter',
	caniuse: ['css', 'properties', 'filter'],
	fn: (): boolean => {
		return CSS.supports('filter', 'grayscale(0.4) blur(5px)')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
 */
export const cssMixBlendMode = {
	data: {
		origin: 'mdn',
		chrome: '41',
		chrome_android: '41',
		firefox: '32',
		firefox_android: '32',
		safari: '8',
		edge: '79',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mix-blend-mode',
	},
	key: 'cssMixBlendMode',
	name: 'CSS mix-blend-mode',
	caniuse: ['css', 'properties', 'mix-blend-mode'],
	fn: (): boolean => {
		return CSS.supports('mix-blend-mode', 'color-burn')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-position
 */
export const cssRubyPosition = {
	data: {
		origin: 'mdn',
		chrome: '84',
		chrome_android: '84',
		firefox: '38',
		firefox_android: '38',
		safari: '18.2',
		edge: '84',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position',
	},
	key: 'cssRubyPosition',
	name: 'CSS ruby-position',
	caniuse: ['css', 'properties', 'ruby-position'],
	fn: (): boolean => {
		return CSS.supports('ruby-position', 'under')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
 */
export const cssScale = {
	data: {
		origin: 'mdn',
		chrome: '104',
		chrome_android: '104',
		firefox: '72',
		firefox_android: '79',
		safari: '14.1',
		edge: '104',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale',
	},
	key: 'cssScale',
	name: 'CSS scale',
	caniuse: ['css', 'properties', 'scale'],
	fn: (): boolean => {
		return CSS.supports('scale', 'none')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 121 (Released 2024-01-23)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
 */
export const cssScrollbarWidth = {
	data: {
		origin: 'mdn',
		chrome: '121',
		chrome_android: '121',
		firefox: '64',
		firefox_android: '64',
		safari: '18.2',
		edge: '121',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width',
	},
	key: 'cssScrollbarWidth',
	name: 'CSS scrollbar-width',
	caniuse: ['css', 'properties', 'scrollbar-width'],
	fn: (): boolean => {
		return CSS.supports('scrollbar-width', 'thin')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 121 (Released 2024-01-23)
 * H: INCOMPATIBLE: Safari
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
 * l: https://caniuse.com/css-rebeccapurple
 */
export const cssScrollbarColor = {
	data: {
		origin: 'mdn',
		chrome: '121',
		chrome_android: '121',
		firefox: '64',
		firefox_android: '64',
		safari: '26.2',
		edge: '121',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color',
	},
	key: 'cssScrollbarColor',
	name: 'CSS scrollbar-color',
	caniuse: ['css', 'properties', 'scrollbar-color'],
	fn: (): boolean => {
		return CSS.supports('scrollbar-color', 'rebeccapurple green')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
 */
export const cssTouchAction = {
	data: {
		origin: 'caniuse',
		title: 'CSS touch-action property',
		description:
			'touch-action is a CSS property that controls filtering of gesture events, providing developers with a declarative mechanism to selectively disable touch scrolling (in one or both axes) or double-tap-zooming.',
		chrome: '36',
		chrome_android: '148',
		firefox: '57',
		firefox_android: '150',
		safari: false,
		edge: '12',
		url: 'https://caniuse.com/css-touch-action',
	},
	key: 'cssTouchAction',
	name: 'CSS touch-action',
	caniuse: 'css-touch-action',
	fn: (): boolean => {
		return CSS.supports('touch-action', 'none')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
 */
export const cssUserSelect = {
	data: {
		origin: 'mdn',
		chrome: '54',
		chrome_android: '54',
		firefox: '69',
		firefox_android: '79',
		safari: false,
		edge: '79',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select',
	},
	key: 'cssUserSelect',
	name: 'CSS user-select',
	caniuse: ['css', 'properties', 'user-select'],
	fn: (): boolean => {
		return CSS.supports('user-select', 'all')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
 */
export const cssZIndex = {
	data: {
		origin: 'mdn',
		chrome: '1',
		chrome_android: '18',
		firefox: '1',
		firefox_android: '4',
		safari: '1',
		edge: '12',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index',
	},
	key: 'cssZIndex',
	name: 'CSS z-index',
	caniuse: ['css', 'properties', 'z-index'],
	fn: (): boolean => {
		return CSS.supports('z-index', '9999')
	},
} as const

/**
 * H: JUST RELEASED: Firefox 126 (Released 2024-05-14)
 */
export const cssZoom = {
	data: {
		origin: 'caniuse',
		title: 'CSS zoom',
		description: 'Method of scaling content while also affecting layout.',
		chrome: '4',
		chrome_android: '148',
		firefox: '126',
		firefox_android: '150',
		safari: '4',
		edge: '12',
		url: 'https://caniuse.com/css-zoom',
	},
	key: 'cssZoom',
	name: 'CSS zoom',
	caniuse: 'css-zoom',
	fn: (): boolean => {
		return CSS.supports('zoom', '200%')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke
 */
export const cssWebkitTextStroke = {
	data: {
		origin: 'mdn',
		chrome: '4',
		chrome_android: '18',
		firefox: '49',
		firefox_android: '49',
		safari: '3',
		edge: '15',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/-webkit-text-stroke',
	},
	key: 'cssWebkitTextStroke',
	name: 'CSS -webkit-text-stroke',
	caniuse: ['css', 'properties', '-webkit-text-stroke'],
	fn: (): boolean => {
		return CSS.supports('-webkit-text-stroke', '4px navy')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 123 (Released 2024-03-19)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
 */
export const cssPaintOrder = {
	data: {
		origin: 'mdn',
		chrome: '123',
		chrome_android: '123',
		firefox: '60',
		firefox_android: '60',
		safari: '11',
		edge: '123',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order',
	},
	key: 'cssPaintOrder',
	name: 'CSS paint-order',
	caniuse: ['css', 'properties', 'paint-order'],
	fn: (): boolean => {
		return CSS.supports('paint-order', 'stroke fill')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 129 (Released 2024-09-17)
 * H: INCOMPATIBLE: Firefox
 * H: INCOMPATIBLE: Safari
 * H: INCOMPATIBLE: Samsung Internet
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size
 */
export const cssInterpolateSize = {
	data: {
		origin: 'mdn',
		chrome: '129',
		chrome_android: '129',
		firefox: false,
		firefox_android: false,
		safari: false,
		edge: '129',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/interpolate-size',
	},
	key: 'cssInterpolateSize',
	name: 'CSS interpolate-size',
	caniuse: ['css', 'properties', 'interpolate-size'],
	fn: (): boolean => {
		return CSS.supports('interpolate-size', 'allow-keywords')
	},
} as const

/**
 */
export const cssConicGradient = {
	data: {
		origin: 'mdn',
		chrome: '69',
		chrome_android: '69',
		firefox: '83',
		firefox_android: '83',
		safari: '12.1',
		edge: '79',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Values/gradient/conic-gradient',
	},
	key: 'cssConicGradient',
	name: 'CSS conic-gradient()',
	caniuse: ['css', 'types', 'gradient', 'conic-gradient'],
	fn: (): boolean => {
		return CSS.supports(
			'background-image',
			'conic-gradient(from 45deg in hsl longer hue, red, red)',
		)
	},
} as const

/**
 * l: https://caniuse.com/css-relative-colors
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors
 */
export const cssRelativeColors = {
	data: {
		origin: 'caniuse',
		title: 'CSS Relative color syntax',
		description:
			'Relative color syntax in CSS allows a color to be defined relative to another color using the `from` keyword and optionally `calc()` for any of the color values.',
		chrome: '131',
		chrome_android: '148',
		firefox: '133',
		firefox_android: '150',
		safari: '18.0',
		edge: '131',
		url: 'https://caniuse.com/css-relative-colors',
	},
	key: 'cssRelativeColors',
	name: 'CSS relative colors',
	caniuse: 'css-relative-colors',
	fn: (): boolean => {
		return CSS.supports('color', 'hsl(from white h s l)')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
 */
export const cssOklch = {
	data: {
		origin: 'mdn',
		chrome: '111',
		chrome_android: '111',
		firefox: '113',
		firefox_android: '113',
		safari: '15.4',
		edge: '111',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/oklch',
	},
	key: 'cssOklch',
	name: 'CSS oklch()',
	caniuse: ['css', 'types', 'color', 'oklch'],
	fn: (): boolean => {
		return CSS.supports('color', 'oklch(59.69% 0.156 49.77 / .5)')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
 */
export const webAnimations = {
	data: {
		origin: 'caniuse',
		title: 'Web Animations API',
		description:
			'Lets you create animations that are run in the browser, as well as inspect and manipulate animations created through declarative means like CSS.',
		chrome: '84',
		chrome_android: '148',
		firefox: '81',
		firefox_android: '150',
		safari: '15',
		edge: '84',
		url: 'https://caniuse.com/web-animation',
	},
	key: 'webAnimations',
	name: 'Web Animations API',
	caniuse: 'web-animation',
	fn: (): boolean => {
		try {
			const tmp = new Animation()
			tmp.cancel()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * l: https://caniuse.com/resizeobserver
 * l: https://caniuse.com/mdn-api_resizeobserver
 * l: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
export const resizeObserver = {
	data: {
		origin: 'caniuse',
		title: 'Resize Observer',
		description:
			'Method for observing and reacting to changes to sizes of DOM elements.',
		chrome: '64',
		chrome_android: '148',
		firefox: '69',
		firefox_android: '150',
		safari: '14',
		edge: '79',
		url: 'https://caniuse.com/resizeobserver',
	},
	key: 'resizeObserver',
	name: 'Resize Observer API',
	caniuse: 'resizeobserver',
	fn: (): boolean => {
		try {
			const tmp = new ResizeObserver(() => {})
			tmp.disconnect()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * l: https://caniuse.com/websockets
 * l: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
 */
export const webSockets = {
	data: {
		origin: 'caniuse',
		title: 'Web Sockets',
		description: 'Bidirectional communication technology for web apps',
		chrome: '16',
		chrome_android: '148',
		firefox: '11',
		firefox_android: '150',
		safari: '7',
		edge: '12',
		url: 'https://caniuse.com/websockets',
	},
	key: 'webSockets',
	name: 'WebSocket API',
	caniuse: 'websockets',
	fn: (): boolean => {
		try {
			!!WebSocket
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * H: INCOMPATIBLE: Firefox
 * H: INCOMPATIBLE: Safari
 * l: https://caniuse.com/mdn-api_scrolltimeline
 * l: https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline
 */
export const scrollTimeline = {
	data: {
		origin: 'mdn',
		chrome: '115',
		chrome_android: '115',
		firefox: false,
		firefox_android: false,
		safari: '26',
		edge: '115',
		url: 'https://developer.mozilla.org/docs/Web/API/ScrollTimeline',
	},
	key: 'scrollTimeline',
	name: 'ScrollTimeline API',
	caniuse: ['api', 'ScrollTimeline'],
	fn: (): boolean => {
		try {
			// @ts-ignore
			new ScrollTimeline()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * H: INCOMPATIBLE: Firefox
 * H: INCOMPATIBLE: Safari
 * l: https://caniuse.com/mdn-api_viewtimeline
 * l: https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline
 */
export const viewTimeline = {
	data: {
		origin: 'mdn',
		chrome: '115',
		chrome_android: '115',
		firefox: false,
		firefox_android: false,
		safari: '26',
		edge: '115',
		url: 'https://developer.mozilla.org/docs/Web/API/ViewTimeline',
	},
	key: 'viewTimeline',
	name: 'ViewTimeline API',
	caniuse: ['api', 'ViewTimeline'],
	fn: (): boolean => {
		try {
			// @ts-ignore
			new ViewTimeline()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * H: JUST RELEASED: Chrome 122 (Released 2024-02-20)
 * H: JUST RELEASED: Firefox 127 (Released 2024-06-11)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection
 */
export const setIntersection = {
	data: {
		origin: 'mdn',
		chrome: '122',
		chrome_android: '122',
		firefox: '127',
		firefox_android: '127',
		safari: '17',
		edge: '122',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection',
	},
	key: 'setIntersection',
	name: 'Set.prototype.intersection',
	caniuse: ['javascript', 'builtins', 'Set', 'intersection'],
	fn: (): boolean => {
		return Object.hasOwn(Set.prototype, 'intersection')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 122 (Released 2024-02-20)
 * H: JUST RELEASED: Firefox 127 (Released 2024-06-11)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom
 */
export const setIsDisjointFrom = {
	data: {
		origin: 'mdn',
		chrome: '122',
		chrome_android: '122',
		firefox: '127',
		firefox_android: '127',
		safari: '17',
		edge: '122',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom',
	},
	key: 'setIsDisjointFrom',
	name: 'Set.prototype.isDisjointFrom',
	caniuse: ['javascript', 'builtins', 'Set', 'isDisjointFrom'],
	fn: (): boolean => {
		return Object.hasOwn(Set.prototype, 'isDisjointFrom')
	},
} as const

/**
 * H: HIDDEN: Firefox 55 (Released 2017-08-08)
 * H: INCOMPATIBLE: Firefox for Android
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API
 */
export const paymentRequestApi = {
	data: {
		origin: 'caniuse',
		title: 'Payment Request API',
		description:
			'Payment Request is a new API for the open web that makes checkout flows easier, faster and consistent on shopping sites.',
		chrome: '78',
		chrome_android: false,
		firefox: false,
		firefox_android: false,
		safari: '13',
		edge: '79',
		url: 'https://caniuse.com/payment-request',
	},
	key: 'paymentRequestApi',
	name: 'Payment Request API',
	caniuse: 'payment-request',
	fn: (): boolean => {
		try {
			const tmp = new PaymentRequest([], {
				total: {
					label: '',
					amount: { currency: 'IDR', value: '0' },
				},
			})
			tmp.abort()
		} catch {
			return false
		}
		return true
	},
} as const

/**
 * H: JUST RELEASED: Firefox 125 (Released 2024-04-16)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
 */
export const cssContentVisibility = {
	data: {
		origin: 'caniuse',
		title: 'CSS content-visibility',
		description:
			"Provides control over when elements are rendered, so rendering can be skipped for elements not yet in the user's viewport. ",
		chrome: '85',
		chrome_android: '148',
		firefox: '125',
		firefox_android: '150',
		safari: '18.0',
		edge: '85',
		url: 'https://caniuse.com/css-content-visibility',
	},
	key: 'cssContentVisibility',
	name: 'CSS content-visibility',
	caniuse: 'css-content-visibility',
	fn: (): boolean => {
		return CSS.supports('content-visibility', 'hidden')
	},
} as const

/**
 */
export const cssBackdropSelector = {
	data: {
		origin: 'mdn',
		chrome: '37',
		chrome_android: '37',
		firefox: '47',
		firefox_android: '47',
		safari: '15.4',
		edge: '79',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/::backdrop',
	},
	key: 'cssBackdropSelector',
	name: 'CSS ::backdrop',
	caniuse: ['css', 'selectors', 'backdrop'],
	fn: (): boolean => {
		return CSS.supports('selector(::backdrop)')
	},
} as const

/**
 * H: JUST RELEASED: Firefox 129 (Released 2024-08-06)
 * l: https://developer.mozilla.org/docs/Web/CSS/transition-behavior
 */
export const cssTransitionBehavior = {
	data: {
		origin: 'mdn',
		chrome: '117',
		chrome_android: '117',
		firefox: '129',
		firefox_android: '129',
		safari: '17.4',
		edge: '117',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior',
	},
	key: 'cssTransitionBehavior',
	name: 'CSS transition-behavior',
	caniuse: ['css', 'properties', 'transition-behavior'],
	fn: (): boolean => {
		return CSS.supports('transition-behavior', 'allow-discrete')
	},
} as const

/**
 * H: INCOMPATIBLE: Firefox
 * H: INCOMPATIBLE: Safari
 */
export const cssCalcSize = {
	data: {
		origin: 'mdn',
		chrome: '129',
		chrome_android: '129',
		firefox: false,
		firefox_android: false,
		safari: false,
		edge: '129',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Values/calc-size',
	},
	key: 'cssCalcSize',
	name: 'CSS calc-size()',
	caniuse: ['css', 'types', 'calc-size'],
	fn: (): boolean => {
		return CSS.supports(
			'height',
			'calc-size(calc-size(max-content, size), size + 2rem)',
		)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
 */
export const cssBackdropFilter = {
	data: {
		origin: 'caniuse',
		title: 'CSS Backdrop Filter',
		description:
			'Method of applying filter effects (like blur, grayscale or hue) to content/elements below the target element.',
		chrome: '76',
		chrome_android: '148',
		firefox: '103',
		firefox_android: '150',
		safari: '18.0',
		edge: '79',
		url: 'https://caniuse.com/css-backdrop-filter',
	},
	key: 'cssBackdropFilter',
	name: 'CSS backdrop-filter',
	caniuse: 'css-backdrop-filter',
	fn: (): boolean => {
		return CSS.supports('backdrop-filter', 'blur(5px)')
	},
} as const

/**
 * H: PARTIAL SUPPORT: Firefox
 * H: JUST RELEASED: Firefox 129 (Released 2024-08-06)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
 */
export const cssStartingStyle = {
	data: {
		origin: 'mdn',
		chrome: '117',
		chrome_android: '117',
		firefox: '129',
		firefox_android: '129',
		safari: '17.5',
		edge: '117',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@starting-style',
	},
	key: 'cssStartingStyle',
	name: 'CSS @starting-style',
	caniuse: ['css', 'at-rules', 'starting-style'],
	fn: (): boolean => {
		return CSS.supports('selector(@starting-style)')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 125 (Released 2024-05-14)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/round
 */
export const cssRound = {
	data: {
		origin: 'mdn',
		chrome: '125',
		chrome_android: '125',
		firefox: '118',
		firefox_android: '118',
		safari: '15.4',
		edge: '125',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Values/round',
	},
	key: 'cssRound',
	name: 'CSS round()',
	caniuse: ['css', 'types', 'round'],
	fn: (): boolean => {
		return CSS.supports('width', 'round(100px)')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 124 (Released 2024-04-16)
 * H: JUST RELEASED: Firefox 123 (Released 2024-02-20)
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTMLUnsafe
 */
export const setHtmlUnsafe = {
	data: {
		origin: 'mdn',
		chrome: '124',
		chrome_android: '124',
		firefox: '123',
		firefox_android: '123',
		safari: '26',
		edge: '124',
		url: 'https://developer.mozilla.org/docs/Web/API/Element/setHTMLUnsafe',
	},
	key: 'setHtmlUnsafe',
	name: 'Element.setHTMLUnsafe()',
	caniuse: ['api', 'Element', 'setHTMLUnsafe'],
	fn: (): boolean => {
		return 'setHTMLUnsafe' in document.body
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
 */
export const toSorted = {
	data: {
		origin: 'mdn',
		chrome: '110',
		chrome_android: '110',
		firefox: '115',
		firefox_android: '115',
		safari: '16',
		edge: '110',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted',
	},
	key: 'toSorted',
	name: 'Array.toSorted()',
	caniuse: ['javascript', 'builtins', 'Array', 'toSorted'],
	fn: (): boolean => {
		return 'toSorted' in Array.prototype
	},
} as const

// H: arrayAt
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at

// H: arrayWith
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with

// cssNesting
// https://github.com/w3c/csswg-drafts/issues/8399
// https://caniuse.com/css-nesting

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert
 */
export const inertHtmlAttribute = {
	data: {
		origin: 'mdn',
		chrome: '102',
		chrome_android: '102',
		firefox: '112',
		firefox_android: '112',
		safari: '15.5',
		edge: '102',
		url: 'https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/inert',
	},
	key: 'inertHtmlAttribute',
	name: 'HTML attribute: inert',
	caniuse: ['html', 'global_attributes', 'inert'],
	fn: (): boolean => {
		return 'inert' in document.body
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
export const cryptoRandomUUID = {
	data: {
		origin: 'mdn',
		chrome: '92',
		chrome_android: '92',
		firefox: '95',
		firefox_android: '95',
		safari: '15.4',
		edge: '92',
		url: 'https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID',
	},
	key: 'cryptoRandomUUID',
	name: 'Crypto.randomUUID()',
	caniuse: ['api', 'Crypto', 'randomUUID'],
	fn: (): boolean => {
		return 'randomUUID' in crypto
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#safe
 */
export const justifyContentSafe = {
	data: {
		origin: 'mdn',
		chrome: '115',
		chrome_android: '115',
		firefox: '63',
		firefox_android: '63',
		safari: '17.6',
		edge: '115',
	},
	key: 'justifyContentSafe',
	name: 'CSS justify-content: safe',
	caniuse: [
		'css',
		'properties',
		'justify-content',
		'flex_context',
		'safe_unsafe',
	],
	url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#safe',
	fn: (): boolean => {
		return CSS.supports('justify-content', 'safe center')
	},
} as const

// H: viewport units (svh, lvh, dvh)
// https://caniuse.com/viewport-unit-variants

// H: focus-visible
// https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

/**
 * @deprecated @internal @experimental
 *
 * H: Will be SKIPPED due to **async** usage!
 * H: Sadly, the only way to check is through async **ImageDecoder.isTypeSupported**.
 * i: **Too limited support!**
 */
export const jpegxl = {
	data: {
		origin: 'caniuse',
		title: 'JPEG XL image format',
		description:
			'A modern image format optimized for web environments. JPEG XL generally has better compression than [WebP](/webp), JPEG, PNG and GIF and is designed to supersede them. JPEG XL competes with [AVIF](/avif) which has similar compression quality but fewer features overall.',
		chrome: false,
		chrome_android: false,
		firefox: false,
		firefox_android: false,
		safari: false,
		edge: false,
		url: 'https://caniuse.com/jpegxl',
	},
	key: 'jpegxl',
	name: 'JPEG XL image format',
	caniuse: 'jpegxl',
	isAsync: true,
	fn: async (): Promise<boolean> => {
		return await ImageDecoder.isTypeSupported('image/jxl')
	},
} as const

export const avif = {
	data: {
		origin: 'caniuse',
		title: 'AVIF image format',
		description:
			'A modern image format based on the [AV1 video format](/av1). AVIF generally has better compression than [WebP](/webp), JPEG, PNG and GIF and is designed to supersede them. AVIF competes with [JPEG XL](/jpegxl) which has similar compression quality and is generally seen as more feature-rich than AVIF.',
		chrome: '85',
		chrome_android: '148',
		firefox: '113',
		firefox_android: '150',
		safari: '16.4',
		edge: '121',
		url: 'https://caniuse.com/avif',
	},
	key: 'avif',
	name: 'AVIF image format',
	caniuse: 'avif',
	isAsync: true,
	fn: async (): Promise<boolean> => {
		return await ImageDecoder.isTypeSupported('image/avif')
	},
} as const

/**
 * Newly supported, so be careful against older browsers.
 *
 * H: Chrome 114 (2023-05)
 * H: Firefox 125 (2024-04)
 *
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 * l: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover
 * l: https://caniuse.com/mdn-api_htmlelement_popover
 */
export const popover = {
	data: {
		origin: 'mdn',
		chrome: '114',
		chrome_android: '114',
		firefox: '125',
		firefox_android: '125',
		safari: '17',
		edge: '114',
		url: 'https://developer.mozilla.org/docs/Web/API/HTMLElement/popover',
	},
	key: 'popover',
	name: 'HTMLElement API: popover',
	caniuse: ['api', 'HTMLElement', 'popover'],
	fn: (): boolean => {
		return HTMLElement.prototype.hasOwnProperty('popover')
	},
} as const

/**
 * H: AVOID; no support yet.
 *
 * H: Probably should also check
 *
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout
 * l: https://caniuse.com/mdn-css_properties_grid-template-rows_masonry
 *
 * Workaround:
 * l: https://css-tricks.com/css-masonry-css-grid/
 * l: https://css-tricks.com/a-lightweight-masonry-solution/
 * l: https://ishadeed.com/article/css-grid-masonry/
 * l: https://blog.avada.io/css/masonry-layout
 */
export const cssGridMasonry = {
	data: {
		origin: 'mdn',
		chrome: false,
		chrome_android: false,
		firefox: '77',
		firefox_android: false,
		safari: 'preview',
		edge: false,
		url: 'https://developer.mozilla.org/docs/Web/CSS/Guides/Grid_layout/Masonry_layout',
	},
	key: 'cssGridMasonry',
	name: 'CSS Grid: Masonry layout',
	caniuse: ['css', 'properties', 'grid-template-rows', 'masonry'],
	fn: (): boolean => {
		return ['rows', 'columns']
			.map((type) => CSS.supports(`grid-template-${type}`, 'masonry'))
			.every(Boolean)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 * l: https://caniuse.com/dialog
 */
export const htmlDialog = {
	data: {
		origin: 'caniuse',
		title: 'Dialog element',
		description:
			'Method of easily creating custom dialog boxes to display to the user with modal or non-modal options. Also includes a `::backdrop` pseudo-element for behind the element.',
		chrome: '37',
		chrome_android: '148',
		firefox: '98',
		firefox_android: '150',
		safari: '15.4',
		edge: '79',
		url: 'https://caniuse.com/dialog',
	},
	key: 'htmlDialog',
	name: 'HTML <dialog> element',
	caniuse: 'dialog',
	fn: (): boolean => {
		return (
			'HTMLDialogElement' in window &&
			'showModal' in HTMLDialogElement.prototype
		)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 * l: https://caniuse.com/view-transitions
 * H: INCOMPATIBLE: Firefox (only same-document since v133)
 */
export const viewTransitions = {
	data: {
		origin: 'caniuse',
		title: 'View Transitions API (single-document)',
		description:
			'Provides a mechanism for easily creating animated transitions between different DOM states, while also updating the DOM contents in a single step. This API is specific to single-document transitions.',
		chrome: '111',
		chrome_android: '148',
		firefox: '144',
		firefox_android: '150',
		safari: '18.0',
		edge: '111',
		url: 'https://caniuse.com/view-transitions',
	},
	key: 'viewTransitions',
	name: 'View Transitions API',
	caniuse: 'view-transitions',
	fn: (): boolean => {
		return 'startViewTransition' in document
	},
} as const

/**
 * H: JUST RELEASED: Chrome 120 (Released 2023-12-05)
 * H: JUST RELEASED: Firefox 117 (Released 2023-08-29)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting
 * l: https://caniuse.com/css-nesting
 */
export const cssNesting = {
	data: {
		origin: 'caniuse',
		title: 'CSS Nesting',
		description:
			'CSS nesting provides the ability to nest one style rule inside another, with the selector of the child rule relative to the selector of the parent rule. Similar behavior previously required a CSS pre-processor.',
		chrome: '120',
		chrome_android: '148',
		firefox: '117',
		firefox_android: '150',
		safari: '17.2',
		edge: '120',
		url: 'https://caniuse.com/css-nesting',
	},
	key: 'cssNesting',
	name: 'CSS nesting',
	caniuse: 'css-nesting',
	fn: (): boolean => {
		return CSS.supports('selector(&)')
	},
} as const

/**
 * H: JUST RELEASED: Chrome 105 (Released 2022-08-30)
 * H: JUST RELEASED: Firefox 121 (Released 2023-12-19)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/:has
 * l: https://caniuse.com/css-has
 */
export const cssHasSelector = {
	data: {
		origin: 'caniuse',
		title: ':has() CSS relational pseudo-class',
		description:
			'Select elements containing specific content. For example, `a:has(img)` selects all `<a>` elements that contain an `<img>` child.',
		chrome: '105',
		chrome_android: '148',
		firefox: '121',
		firefox_android: '150',
		safari: '15.4',
		edge: '105',
		url: 'https://caniuse.com/css-has',
	},
	key: 'cssHasSelector',
	name: 'CSS :has() selector',
	caniuse: 'css-has',
	fn: (): boolean => {
		return CSS.supports('selector(:has(*))')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
 * l: https://caniuse.com/mdn-api_structuredclone
 */
export const structuredClone = {
	data: {
		origin: 'mdn',
		chrome: '98',
		chrome_android: '98',
		firefox: '94',
		firefox_android: '94',
		safari: '15.4',
		edge: '98',
		url: 'https://developer.mozilla.org/docs/Web/API/Window/structuredClone',
	},
	key: 'structuredClone',
	name: 'structuredClone()',
	caniuse: ['api', 'structuredClone'],
	fn: (): boolean => {
		return 'structuredClone' in window
	},
} as const

/**
 * H: JUST RELEASED: Chrome 119 (Released 2023-10-31)
 * H: JUST RELEASED: Firefox 121 (Released 2023-12-19)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
 */
export const promiseWithResolvers = {
	data: {
		origin: 'mdn',
		chrome: '119',
		chrome_android: '119',
		firefox: '121',
		firefox_android: '121',
		safari: '17.4',
		edge: '119',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers',
	},
	key: 'promiseWithResolvers',
	name: 'Promise.withResolvers()',
	caniuse: ['javascript', 'builtins', 'Promise', 'withResolvers'],
	fn: (): boolean => {
		return 'withResolvers' in Promise
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
 */
export const arrayAt = {
	data: {
		origin: 'mdn',
		chrome: '92',
		chrome_android: '92',
		firefox: '90',
		firefox_android: '90',
		safari: '15.4',
		edge: '92',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/at',
	},
	key: 'arrayAt',
	name: 'Array.at()',
	caniuse: ['javascript', 'builtins', 'Array', 'at'],
	fn: (): boolean => {
		return 'at' in Array.prototype
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
 */
export const arrayWith = {
	data: {
		origin: 'mdn',
		chrome: '110',
		chrome_android: '110',
		firefox: '115',
		firefox_android: '115',
		safari: '16',
		edge: '110',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/with',
	},
	key: 'arrayWith',
	name: 'Array.with()',
	caniuse: ['javascript', 'builtins', 'Array', 'with'],
	fn: (): boolean => {
		return 'with' in Array.prototype
	},
} as const

/**
 * H: JUST RELEASED: Chrome 111 (Released 2023-03-07)
 * H: JUST RELEASED: Firefox 113 (Released 2023-05-09)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
 */
export const cssColorMix = {
	data: {
		origin: 'mdn',
		chrome: '111',
		chrome_android: '111',
		firefox: '113',
		firefox_android: '113',
		safari: '16.2',
		edge: '111',
		url: 'https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/color-mix',
	},
	key: 'cssColorMix',
	name: 'CSS color-mix()',
	caniuse: ['css', 'types', 'color', 'color-mix'],
	fn: (): boolean => {
		return CSS.supports('color', 'color-mix(in srgb, red 50%, blue)')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths
 * l: https://caniuse.com/viewport-unit-variants
 */
export const viewportUnits = {
	data: {
		origin: 'caniuse',
		title: 'Small, Large, and Dynamic viewport units',
		description:
			'Viewport units similar to `vw` and `vh` that are based on shown or hidden browser UI states to address shortcomings of the original units. Currently defined as the `sv*` units (`svb`, `svh`, `svi`, `svmax`, `svmin`, `svw`), `lv*` units (`lvb`, `lvh`, `lvi`, `lvmax`, `lvmin`, `lvw`), `dv*` units (`dvb`, `dvh`, `dvi`, `dvmax`, `dvmin`, `dvw`) and the logical `vi`/`vb` units.',
		chrome: '108',
		chrome_android: '148',
		firefox: '101',
		firefox_android: '150',
		safari: '15.4',
		edge: '108',
		url: 'https://caniuse.com/viewport-unit-variants',
	},
	key: 'viewportUnits',
	name: 'CSS viewport units (svh/lvh/dvh)',
	caniuse: 'viewport-unit-variants',
	fn: (): boolean => {
		return (
			CSS.supports('height', '1svh') &&
			CSS.supports('height', '1lvh') &&
			CSS.supports('height', '1dvh')
		)
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
 * l: https://caniuse.com/css-focus-visible
 */
export const cssFocusVisible = {
	data: {
		origin: 'caniuse',
		title: ':focus-visible CSS pseudo-class',
		description:
			'The `:focus-visible` pseudo-class applies while an element matches the `:focus` pseudo-class, and the UA determines via heuristics that the focus should be specially indicated on the element (typically via a “focus ring”).',
		chrome: '86',
		chrome_android: '148',
		firefox: '85',
		firefox_android: '150',
		safari: '15.4',
		edge: '86',
		url: 'https://caniuse.com/css-focus-visible',
	},
	key: 'cssFocusVisible',
	name: 'CSS :focus-visible',
	caniuse: 'css-focus-visible',
	fn: (): boolean => {
		return CSS.supports('selector(:focus-visible)')
	},
} as const

/**
 * H: INCOMPATIBLE: Firefox
 * H: INCOMPATIBLE: Safari
 * l: https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
 */
export const navigationApi = {
	data: {
		origin: 'mdn',
		chrome: '102',
		chrome_android: '102',
		firefox: '147',
		firefox_android: '147',
		safari: '26.2',
		edge: '102',
		url: 'https://developer.mozilla.org/docs/Web/API/Navigation',
	},
	key: 'navigationApi',
	name: 'Navigation API',
	caniuse: ['api', 'Navigation'],
	fn: (): boolean => {
		return 'navigation' in window
	},
} as const

/**
 * H: JUST RELEASED: Chrome 95 (Released 2021-10-19)
 * H: JUST RELEASED: Firefox 107 (Released 2022-11-15)
 * l: https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
 */
export const urlPattern = {
	data: {
		origin: 'mdn',
		chrome: '95',
		chrome_android: '95',
		firefox: '142',
		firefox_android: '142',
		safari: '26',
		edge: '95',
		url: 'https://developer.mozilla.org/docs/Web/API/URLPattern',
	},
	key: 'urlPattern',
	name: 'URLPattern API',
	caniuse: ['api', 'URLPattern'],
	fn: (): boolean => {
		return 'URLPattern' in window
	},
} as const

/**
 * H: INCOMPATIBLE: Firefox
 * H: JUST RELEASED: Chrome 125 (Released 2024-05-14)
 * l: https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-name
 * l: https://caniuse.com/css-anchor-positioning
 */
export const cssAnchorPositioning = {
	data: {
		origin: 'caniuse',
		title: 'CSS Anchor Positioning',
		description:
			'Allows placing elements anywhere on the page relative to an "anchor element", without regard to the layout of other elements besides their containing block',
		chrome: '125',
		chrome_android: '148',
		firefox: '147',
		firefox_android: '150',
		safari: '26.0',
		edge: '125',
		url: 'https://caniuse.com/css-anchor-positioning',
	},
	key: 'cssAnchorPositioning',
	name: 'CSS anchor positioning',
	caniuse: 'css-anchor-positioning',
	fn: (): boolean => {
		return CSS.supports('anchor-name', '--a')
	},
} as const

/**
 * l: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#declarative_shadow_dom
 * l: https://caniuse.com/declarative-shadow-dom
 */
export const declarativeShadowDom = {
	data: {
		origin: 'caniuse',
		title: 'Declarative Shadow DOM',
		description:
			'Proposal to allow rendering elements with shadow dom (aka web components) using server-side rendering.',
		chrome: '111',
		chrome_android: '148',
		firefox: '123',
		firefox_android: '150',
		safari: '16.4',
		edge: '111',
		url: 'https://caniuse.com/declarative-shadow-dom',
	},
	key: 'declarativeShadowDom',
	name: 'Declarative Shadow DOM',
	caniuse: 'declarative-shadow-dom',
	fn: (): boolean => {
		return 'shadowRootMode' in HTMLTemplateElement.prototype
	},
} as const

/**
 * H: JUST RELEASED: Chrome 128 (Released 2024-08-20)
 * H: JUST RELEASED: Firefox 132 (Released 2024-10-29)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/try
 */
export const promiseTry = {
	data: {
		origin: 'mdn',
		chrome: '128',
		chrome_android: '128',
		firefox: '134',
		firefox_android: '134',
		safari: '18.2',
		edge: '128',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/try',
	},
	key: 'promiseTry',
	name: 'Promise.try()',
	caniuse: ['javascript', 'builtins', 'Promise', 'try'],
	fn: (): boolean => {
		return 'try' in Promise
	},
} as const

/**
 * H: JUST RELEASED: Chrome 136 (Released 2025-04-22)
 * H: JUST RELEASED: Firefox 134 (Released 2025-01-07)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
 */
export const regexpEscape = {
	data: {
		origin: 'mdn',
		chrome: '136',
		chrome_android: '136',
		firefox: '134',
		firefox_android: '134',
		safari: '18.2',
		edge: '136',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape',
	},
	key: 'regexpEscape',
	name: 'RegExp.escape()',
	caniuse: ['javascript', 'builtins', 'RegExp', 'escape'],
	fn: (): boolean => {
		return 'escape' in RegExp
	},
} as const

/**
 * H: JUST RELEASED: Chrome 123 (Released 2024-03-19)
 * H: JUST RELEASED: Firefox 128 (Released 2024-07-09)
 * l: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
 */
export const importAttributes = {
	data: {
		origin: 'mdn',
		chrome: '123',
		chrome_android: '123',
		firefox: '138',
		firefox_android: '138',
		safari: '17.2',
		edge: '123',
		url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import/with',
	},
	key: 'importAttributes',
	name: 'Import attributes',
	caniuse: ['javascript', 'statements', 'import', 'import_attributes'],
	fn: (): boolean => {
		try {
			new Function(
				'return import("data:application/json,{}", { with: { type: "json" } })',
			)
			return true
		} catch {
			return false
		}
	},
} as const
