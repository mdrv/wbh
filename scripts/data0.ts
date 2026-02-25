/**
 * @deprecated Not gonna work with Rollup (function became !0)
 * A must in web development!
 * Should always return true, anyway.
 *
 * i: Should be supported across ES6+ browsers
 * l: https://caniuse.com/arrow-functions
 */
export const arrowFunction = {
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
	key: 'jpegxl',
	name: 'JPEG XL image format',
	caniuse: 'jpegxl',
	isAsync: true,
	fn: async (): Promise<boolean> => {
		return await ImageDecoder.isTypeSupported('image/jxl')
	},
} as const

export const avif = {
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
