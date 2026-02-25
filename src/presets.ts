import type { FeatureMod } from './types.ts'
import { Level } from './level.ts'
import * as data from './data.ts'

export const modernWebApp = (): FeatureMod => [
	{
		feat: data.cssNesting,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Foundation of modern CSS architecture',
	},
	{
		feat: data.cssHasSelector,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Enables parent-aware styling',
	},
	{
		feat: data.cssGrid,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Core layout primitive',
	},
	{
		feat: data.cssContainerType,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Component-scoped responsive design',
	},
	{
		feat: data.htmlDialog,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Native modal/dialog support',
	},
	{
		feat: data.structuredClone,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Deep cloning without hacks',
	},
	{
		feat: data.customElements,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Web component interop',
	},
	{
		feat: data.cssSubgrid,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Nested grid alignment',
	},
	{
		feat: data.viewportUnits,
		level: Level.IMPORTANT,
		score: 8,
		wisdom: 'Reliable mobile viewport sizing',
	},
	{
		feat: data.cssFocusVisible,
		level: Level.IMPORTANT,
		score: 8,
		wisdom: 'Accessible focus indicators',
	},
	{
		feat: data.cssBackdropFilter,
		level: Level.IMPORTANT,
		score: 6,
		wisdom: 'Glass morphism effects',
	},
	{
		feat: data.popover,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Native popover without JS',
	},
	{
		feat: data.cssColorMix,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Dynamic color manipulation',
	},
	{
		feat: data.cssOklch,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Perceptually uniform colors',
	},
	{
		feat: data.viewTransitions,
		level: Level.OPTIONAL,
		score: 6,
		wisdom: 'Smooth page transitions',
	},
]

export const spa = (): FeatureMod => [
	{
		feat: data.cssNesting,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Modern CSS architecture',
	},
	{
		feat: data.cssHasSelector,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Parent-aware selectors',
	},
	{
		feat: data.cssGrid,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Layout foundation',
	},
	{
		feat: data.htmlDialog,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Modal dialogs',
	},
	{
		feat: data.structuredClone,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'State cloning',
	},
	{
		feat: data.promiseWithResolvers,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Async control flow',
	},
	{
		feat: data.webAnimations,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Programmatic animations',
	},
	{
		feat: data.resizeObserver,
		level: Level.IMPORTANT,
		score: 8,
		wisdom: 'Responsive components',
	},
	{
		feat: data.viewTransitions,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Route transitions',
	},
	{
		feat: data.popover,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Tooltips and dropdowns',
	},
	{
		feat: data.cssContentVisibility,
		level: Level.OPTIONAL,
		score: 6,
		wisdom: 'Rendering performance',
	},
	{
		feat: data.navigationApi,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Client-side routing',
	},
]

export const contentSite = (): FeatureMod => [
	{
		feat: data.cssGrid,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Article layout',
	},
	{
		feat: data.cssMathFunctions,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Fluid typography',
	},
	{
		feat: data.cssNesting,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Cleaner stylesheets',
	},
	{
		feat: data.cssTextWrap,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Balanced headings',
	},
	{
		feat: data.cssAspectRatio,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Media embeds',
	},
	{
		feat: data.viewportUnits,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Mobile-safe layouts',
	},
	{
		feat: data.cssFocusVisible,
		level: Level.IMPORTANT,
		score: 8,
		wisdom: 'Accessibility',
	},
	{
		feat: data.cssOklch,
		level: Level.OPTIONAL,
		score: 4,
		wisdom: 'Color theming',
	},
	{
		feat: data.cssRelativeColors,
		level: Level.OPTIONAL,
		score: 4,
		wisdom: 'Dynamic palettes',
	},
]

export const dataHeavy = (): FeatureMod => [
	{
		feat: data.indexedDb,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Client-side storage',
	},
	{
		feat: data.structuredClone,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Deep data copying',
	},
	{
		feat: data.webSockets,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Real-time data sync',
	},
	{
		feat: data.promiseWithResolvers,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Async orchestration',
	},
	{
		feat: data.setIntersection,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Set operations on data',
	},
	{
		feat: data.toSorted,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Immutable sorting',
	},
	{
		feat: data.arrayAt,
		level: Level.IMPORTANT,
		score: 6,
		wisdom: 'Negative indexing',
	},
	{
		feat: data.fileSystemApi,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Local file access',
	},
	{
		feat: data.cryptoRandomUUID,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Client-side IDs',
	},
]

export const cuttingEdge = (): FeatureMod => [
	{
		feat: data.cssNesting,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Modern CSS',
	},
	{
		feat: data.cssHasSelector,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Relational selectors',
	},
	{
		feat: data.viewTransitions,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Page transitions',
	},
	{
		feat: data.cssAnchorPositioning,
		level: Level.CRITICAL,
		score: 7,
		wisdom: 'Anchor-based positioning',
	},
	{
		feat: data.popover,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Native popovers',
	},
	{
		feat: data.promiseWithResolvers,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Modern async',
	},
	{
		feat: data.declarativeShadowDom,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'SSR web components',
	},
	{
		feat: data.cssInterpolateSize,
		level: Level.IMPORTANT,
		score: 6,
		wisdom: 'Animate to auto',
	},
	{
		feat: data.cssStartingStyle,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Entry animations',
	},
	{
		feat: data.cssTransitionBehavior,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Discrete transitions',
	},
	{
		feat: data.scrollTimeline,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Scroll-driven animations',
	},
	{
		feat: data.navigationApi,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Modern routing',
	},
	{
		feat: data.promiseTry,
		level: Level.OPTIONAL,
		score: 4,
		wisdom: 'Sync-to-async bridge',
	},
	{
		feat: data.regexpEscape,
		level: Level.OPTIONAL,
		score: 4,
		wisdom: 'Safe regex construction',
	},
]

export const minimal = (): FeatureMod => [
	{
		feat: data.cssGrid,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Basic layout',
	},
	{
		feat: data.cssMathFunctions,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Responsive sizing',
	},
	{
		feat: data.cssInset,
		level: Level.IMPORTANT,
		score: 6,
		wisdom: 'Positioning shorthand',
	},
	{
		feat: data.resizeObserver,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Responsive behavior',
	},
	{
		feat: data.webSockets,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Real-time comms',
	},
]

export const ecommerce = (): FeatureMod => [
	{
		feat: data.cssGrid,
		level: Level.CRITICAL,
		score: 10,
		wisdom: 'Product grid layout',
	},
	{
		feat: data.cssNesting,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Component styles',
	},
	{
		feat: data.htmlDialog,
		level: Level.CRITICAL,
		score: 9,
		wisdom: 'Cart/checkout modals',
	},
	{
		feat: data.structuredClone,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Cart state management',
	},
	{
		feat: data.cssAspectRatio,
		level: Level.CRITICAL,
		score: 8,
		wisdom: 'Product image ratios',
	},
	{
		feat: data.cssContainerType,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Product card responsiveness',
	},
	{
		feat: data.webAnimations,
		level: Level.IMPORTANT,
		score: 6,
		wisdom: 'Add-to-cart feedback',
	},
	{
		feat: data.popover,
		level: Level.IMPORTANT,
		score: 7,
		wisdom: 'Quick-view popovers',
	},
	{
		feat: data.cssFocusVisible,
		level: Level.IMPORTANT,
		score: 8,
		wisdom: 'Accessible navigation',
	},
	{
		feat: data.paymentRequestApi,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Native checkout',
	},
	{
		feat: data.viewTransitions,
		level: Level.OPTIONAL,
		score: 5,
		wisdom: 'Page transitions',
	},
]
