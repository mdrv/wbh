import type { Feature, Result } from './types.ts'
import { el, setChildren, svg } from 'redom'
import mobile from 'is-mobile'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
const withInnerHtml = <T extends Element>(el: T, innerHTML: string): T => {
	el.innerHTML = innerHTML
	return el
}

export const svgPath = {
	/**
	 * simple-icons:googlechrome
	 */
	chrome:
		'<path fill="currentColor" d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0M1.931 5.47A11.94 11.94 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257q.309.015.621.016c6.627 0 12-5.373 12-12c0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728a4.364 4.364 0 0 1 0 8.728"/>',
	/**
	 * simple-icons:firefoxbrowser
	 */
	firefox:
		'<path fill="currentColor" d="M8.824 7.287c.008 0 .004 0 0 0m-2.8-1.4c.006 0 .003 0 0 0m16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943c.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477c-.091-.147-.184-.292-.273-.446a4 4 0 0 1-.13-.24a2 2 0 0 1-.172-.46a.03.03 0 0 0-.027-.03a.04.04 0 0 0-.021 0l-.006.001l-.01.005l.005-.008c-2.585 1.515-3.657 4.168-3.932 5.856a6.2 6.2 0 0 0-2.305.587a.297.297 0 0 0-.147.37c.057.162.24.24.396.17a5.6 5.6 0 0 1 2.008-.523l.067-.005a5.9 5.9 0 0 1 1.957.222l.095.03a6 6 0 0 1 .616.228q.12.054.238.112l.107.055a6 6 0 0 1 .368.211a5.95 5.95 0 0 1 2.034 2.104c-.62-.437-1.733-.868-2.803-.681c4.183 2.09 3.06 9.292-2.737 9.02a5.2 5.2 0 0 1-1.513-.292a4 4 0 0 1-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806c0 0 .537-2 3.845-2c.357 0 1.38-.998 1.398-1.287c-.005-.095-2.029-.9-2.817-1.677c-.422-.416-.622-.616-.8-.767a4 4 0 0 0-.301-.227a5.4 5.4 0 0 1-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913c-.006-.025-.343.176-.389.206a8.4 8.4 0 0 0-1.136.974q-.596.606-1.085 1.303a9.8 9.8 0 0 0-1.562 3.52c-.003.013-.11.487-.19 1.073q-.02.135-.037.272a8 8 0 0 0-.069.667l-.002.034l-.023.387l-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661q.028-.223.052-.448c.232-1.994-.025-4.09-.753-5.844z"/>',
	/**
	 * bx:mobile
	 */
	mobile:
		'<path fill="currentColor" d="M12.75 0H2.25A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V2.25A2.25 2.25 0 0 0 12.75 0M7.5 22.5a1.498 1.498 0 1 1 .002-2.996A1.498 1.498 0 0 1 7.5 22.5h-.001z"/>',
}

const buildUrl = (obj: ReadonlyArray<string> | string) => {
	if (Array.isArray(obj)) {
		return 'https://caniuse.com/mdn-' + obj.join('_').toLowerCase()
	} else {
		return 'https://caniuse.com/' + obj
	}
}

import { css } from './css.ts'
import snarkdown from 'snarkdown'

type MountOpts = {
	footerMd: string
	headerEl: Element | string
}

const defaultOpts: MountOpts = {
	footerMd: '[Powered by **@mdrv/wbh**](https://github.com/mdrv/wbh)',
	headerEl: svg(
		'svg',
		{ viewBox: '0 0 78 96', fill: '#85e' },
		svg('path', { d: 'M 0,0 L 54,0 L 27,80 M 70,44 L 78,96 L 54,96 Z' }),
	),
}

/**
 * A simple error message showing list of unsupported features.
 *
 * H: Take better styling from previous attempt: /x/b/m (with MV logo)
 */
export const mountError = async (
	wbh: Result,
	root: HTMLDivElement,
	opts?: Partial<MountOpts>,
): Promise<void> => {
	const { headerEl, footerMd } = { ...defaultOpts, ...opts }
	const div = document.createElement('div')
	div.classList.add('__wbh__')
	div.style.opacity = '0'
	root.append(div)
	// i: Use `getComputedStyle` to force a reflow, ensuring the transition is triggered
	// l: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
	window.getComputedStyle(div).opacity
	const isMobile = mobile()
	setChildren(div, [
		el(
			'style',
			"@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&display=swap');",
		),
		el('style', css),
		svg('svg.DEFS', { width: '0', height: '0', style: 'display: none' }, [
			svg('defs', [
				withInnerHtml(svg('symbol#chrome'), svgPath.chrome),
				withInnerHtml(svg('symbol#firefox'), svgPath.firefox),
				withInnerHtml(svg('symbol#mobile'), svgPath.mobile),
			]),
		]),
		typeof headerEl === 'string'
			? withInnerHtml(el('div.LOGO'), snarkdown(headerEl))
			: el('div.LOGO', headerEl),
		el('p', [
			el('strong', 'Your browser is not supported.'),
			el('br'),
			'Switch to the latest version of ',
			el(
				'a.CHROME',
				{ href: 'https://www.google.com/chrome/', target: '_blank' },
				'Chrome',
			),
			' or ',
			el(
				'a.FIREFOX',
				{ href: 'https://www.mozilla.org/firefox/', target: '_blank' },
				'Firefox',
			),
			' for better compatibility.',
		]),
		el('details', { open: true }, [
			el('summary', 'List of features:'),
			el(
				'div.ROOT',
				wbh.unsupported
					.toSorted((a, b) => (b.score || 0) - (a.score || 0))
					.map((feature: Feature) =>
						el(
							'div.FEATURE',
							{
								key: feature.key,
								'data-level': feature.level,
							},
							[
								el(
									'dialog',
									{
										id: feature.key,
										onclick: (e: MouseEvent) => {
											const dialog = e.currentTarget as HTMLDialogElement
											if (!(e.target as HTMLElement).contains(dialog)) return
											;(e.currentTarget as HTMLDialogElement).close()
										},
									},
									[
										el('div', { style: 'margin:0' }, [
											el('h2', feature.name),
											el(
												'h5',
												['CRITICAL', 'IMPORTANT', 'OPTIONAL', 'UNUSED'][
													feature.level
												] ?? 'UNKNOWN',
											),
											feature.data?.description &&
												withInnerHtml(
													el('p'),
													snarkdown(feature.data.description),
												),
											feature.wisdom &&
												el(
													'p',
													{ style: 'font-size:75%;opacity:.75;' },
													feature.wisdom,
												),
											(feature.url || feature.data.url) &&
												el(
													'a',
													{
														href: feature.url || feature.data.url,
														style: 'font-size:75%;font-weight:700;opacity:.5;',
													},
													'Learn more',
												),
											el('div.FLEX3', [
												el('div.BROWSER.CHROME', [
													svg(
														'svg',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#chrome' }),
													),
													el('h5', feature.data.chrome || '-'),
												]),
												el('div.BROWSER.FIREFOX', [
													svg(
														'svg',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#firefox' }),
													),
													el('h5', feature.data.firefox || '-'),
												]),
												el('div.BROWSER.CHROME', [
													svg(
														'svg',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#chrome' }),
													),
													svg(
														'svg.mobile',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#mobile' }),
													),
													el(
														'h5',
														feature.data.origin === 'caniuse' &&
															feature.data.chrome_android
															? '?'
															: feature.data.chrome_android || '-',
													),
												]),
												el('div.BROWSER.FIREFOX', [
													svg(
														'svg',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#firefox' }),
													),
													svg(
														'svg.mobile',
														{ viewBox: '0 0 24 24' },
														svg('use', { href: '#mobile' }),
													),
													el(
														'h5',
														feature.data.origin === 'caniuse' &&
															feature.data.firefox_android
															? '?'
															: feature.data.firefox_android || '-',
													),
												]),
											]),
										]),
									],
								),
								el('a', {
									// href: buildUrl(feature.caniuse),
									onclick: () =>
										(
											document.querySelector(
												`dialog#${feature.key}`,
											) as HTMLDialogElement
										)?.showModal(),
								}),
								el('div.FLEX', [
									el(
										'button.HELP',
										{
											onclick: () =>
												(
													document.querySelector(
														`dialog#${feature.key}`,
													) as HTMLDialogElement
												)?.showModal(),
											title: feature.wisdom ?? '- (no reason specified)',
										},
										'?',
									),
									el('h4', [
										feature.name,
										el(
											'h6',
											['CRITICAL', 'IMPORTANT', 'OPTIONAL', 'UNUSED'][
												feature.level
											] ?? 'UNKNOWN',
										),
									]),
									el('div.FLEX2', [
										el('div.BROWSER.CHROME', [
											svg(
												'svg',
												{ viewBox: '0 0 24 24' },
												svg('use', { href: '#chrome' }),
											),
											isMobile &&
												feature.data.origin === 'mdn' &&
												svg(
													'svg.mobile',
													{ viewBox: '0 0 24 24' },
													svg('use', { href: '#mobile' }),
												),
											el(
												'h5',
												feature.data[
													isMobile && feature.data.origin === 'mdn'
														? 'chrome_android'
														: 'chrome'
												] || '-',
											),
										]),
										el('div.BROWSER.FIREFOX', [
											svg(
												'svg',
												{ viewBox: '0 0 24 24' },
												svg('use', { href: '#firefox' }),
											),
											isMobile &&
												feature.data.origin === 'mdn' &&
												svg(
													'svg.mobile',
													{ viewBox: '0 0 24 24' },
													svg('use', { href: '#mobile' }),
												),
											el(
												'h5',
												feature.data[
													isMobile && feature.data.origin === 'mdn'
														? 'firefox_android'
														: 'firefox'
												] || '-',
											),
										]),
									]),
								]),
							],
						),
					),
			),
		]),
		withInnerHtml(
			el('h6.FOOTER', { style: { opacity: 0.3, 'font-weight': 'normal' } }),
			snarkdown(footerMd),
		),
	])
	// H: Prevent font flashing
	// l: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API
	await Promise.any([document.fonts.ready, delay(2500)])
	div.removeAttribute('style')
}
