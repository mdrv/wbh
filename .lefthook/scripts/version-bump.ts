#!/usr/bin/env bun
/**
 * Auto-increment COMMIT segment in package.json version.
 * Runs on pre-commit AFTER commit-msg validated that
 * commit message version == package.json version.
 *
 * Flow:
 * 1. commit-msg enforces: msg version == package.json version  ✅
 * 2. This script bumps: package.json += 1                  → staged into THIS commit
 * 3. Result: committed msg = v265.0.2, committed pkg = 265.0.3
 *
 * On amend (--amend): detects that commit-msg version matches
 * package.json version (user already synced for amend),
 * and exits without double-bumping.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const pkgPath = new URL('../../package.json', import.meta.url).pathname

// Detect amend / already-synced: if commit-msg version equals
// package.json version, skip bumping (avoiding double-bump on amend)
try {
	const msg = execSync('cat .git/COMMIT_EDITMSG', {
		encoding: 'utf-8',
		stdio: 'pipe',
	}).trim()
	const msgVersion = msg.match(/^v(\d+\.\d+\.\d+)/)?.[1]
	if (msgVersion) {
		const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
		if (pkg.version === msgVersion) {
			console.log(
				`[version] Already at ${msgVersion} — skipping bump (amend or pre-synced)`,
			)
			process.exit(0)
		}
	}
} catch {
	// No commit message file or not a git repo — continue with bump
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const [yym, minor, commit] = pkg.version.split('.').map(Number)

const prevVersion = pkg.version
const nextVersion = `${yym}.${minor}.${commit + 1}`
pkg.version = nextVersion

writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n', 'utf-8')

console.log(`[version] ${prevVersion} → ${nextVersion}`)

// Stage the bumped version so it's part of this commit
try {
	execSync('git add package.json', { stdio: 'pipe' })
	console.log('[version] Staged package.json with next version')
} catch {
	// Not a git repo or no changes to stage — skip silently
}
