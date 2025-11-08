// H: Try to type-check with tsc.
// i: It is possible to generate and place one file for all versions, but their APIs might differ.
// H: If you intend to generate for older version, might as well add a deprecation notice (encourage to use the latest version).

import * as owned from './data0.ts'
const original = await Bun.file(`${__dirname}/data0.ts`).text()
if (!Bun.env.V || !Bun.env.V.match(/^\d{3}$/))
	throw new Error('Please specify env.V with 3-digit version!')
const generated = `${__dirname}/v${Bun.env.V}/data.ts`

import bcd, {
	type CompatData,
	type CompatStatement,
} from '@mdn/browser-compat-data' with { type: 'json' }
import db from 'caniuse-db/data.json' with { type: 'json' }
import { get } from 'es-toolkit/compat'
import { isEqual } from 'es-toolkit'

const getFirstY = (obj: Record<string, any>) =>
	Object.entries(obj).find((x) => x[1] === 'y')?.[0] ?? false

const getData = (key: string | ReadonlyArray<string>) => {
	try {
		if (Array.isArray(key)) {
			const _s = get(bcd, key)
			const s = _s.__compat
			const [chrome, chrome_android, firefox, firefox_android] = [
				'chrome',
				'chrome_android',
				'firefox',
				'firefox_android',
			].map(
				(browser) =>
					s.support[browser]?.version_added ??
					s.support[browser]?.find((x: object) =>
						isEqual(Object.keys(x), ['version_added']),
					)?.version_added ??
					false,
			)
			const url = s.mdn_url
			const { title } = s
			return {
				origin: 'mdn',
				title,
				chrome,
				chrome_android,
				firefox,
				firefox_android,
				url,
			}
		} else {
			const s = db.data[key]
			const [chrome, chrome_android, firefox, firefox_android] = [
				'chrome',
				'and_chr',
				'firefox',
				'and_ff',
			].map((browser) => getFirstY(s?.stats?.[browser]))
			const url = 'https://caniuse.com/' + key
			const { title, description } = s
			return {
				origin: 'caniuse',
				title,
				description,
				chrome,
				chrome_android,
				firefox,
				firefox_android,
				url,
			}
		}
	} catch (err) {
		throw new Error(String(key))
	}
}

const _allData = await Promise.all(
	Object.entries(owned).map(
		([key, feature]: [string, any]) =>
			new Promise((resolve) => {
				console.log(`${feature.name} \`${feature.key}\``)
				const obj = getData(feature.caniuse)
				if (!obj) throw Error(key + ' got an error')
				resolve([key, obj])
			}),
	),
)
const allData = Object.fromEntries(_allData)

const lines = original.split(/\r?\n/)
const newLines: Array<string> = []
lines.forEach((l) => {
	newLines.push(l)
	if (l.startsWith('export const ')) {
		const key = l.match(/export const (\w+)/)?.[1]
		// console.log(key)
		if (!key) throw Error('Error with ' + l)
		newLines.push('    data: ' + JSON.stringify(allData[key]) + ',')
	}
})

Bun.file(generated).write(newLines.join('\n'))
