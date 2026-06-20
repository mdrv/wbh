#!/usr/bin/env bun
// Pre-push guard: ensures package.json version is consistent with last commit.
// Package paths: .lefthook/version-files.jsonc (default: ["package.json"])
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

function getVersionFiles(): string[] {
	try {
		const files = Bun.JSONC.parse(readFileSync('.lefthook/version-files.jsonc', 'utf-8'))
		if (Array.isArray(files) && files.length > 0) return files
	} catch {}
	return ['package.json']
}

const files = getVersionFiles()
const versions = files.map(f => JSON.parse(readFileSync(f, 'utf-8')).version as string)
const unique = [...new Set(versions)]
if (unique.length > 1) {
	console.error('❌ Versions out of sync:')
	for (let i = 0; i < files.length; i++) {
		console.error(`   ${files[i]}: ${versions[i]}`)
	}
	process.exit(1)
}

const pkgV = unique[0]
const lastCommit = execSync('git log -1 --pretty=%s', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim()
const commitV = lastCommit.match(/^v(\d+\.\d+\.\d+)/)?.[1]

if (!commitV) { console.error('❌ No version prefix on latest commit'); process.exit(1) }

const [, , cCommit] = commitV.split('.').map(Number)
const [, , pCommit] = pkgV.split('.').map(Number)

if (pCommit === cCommit + 1) { console.log(`✅ consistent: commit=v${commitV}, pkg=v${pkgV}`) }
else if (pCommit === cCommit) { console.log(`✅ consistent (amend): v${commitV} = v${pkgV}`) }
else { console.error(`❌ mismatch: commit=v${commitV} but pkg=v${pkgV}`); process.exit(1) }
