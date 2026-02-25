#!/usr/bin/env bun
/**
 * Pre-push guard: ensures package.json version is consistent.
 * Catches cases where someone committed without lefthook active.
 *
 * After a normal commit:
 *   commit message = v265.0.2  (what user typed)
 *   package.json    = 265.0.3  (auto-bumped by pre-commit)
 *
 * After an amend:
 *   commit message = v265.0.2  (user re-typed to match)
 *   package.json    = 265.0.2  (no bump, amend detected)
 */
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const pkgVersion = pkg.version

// Get the version from the latest commit message
const lastCommit = execSync('git log -1 --pretty=%s', {
	encoding: 'utf-8',
	stdio: ['pipe', 'pipe', 'ignore'],
}).trim()

const commitVersion = lastCommit.match(/^v(\d+\.\d+\.\d+)/)?.[1]

if (!commitVersion) {
	console.error('❌ Latest commit has no version prefix')
	process.exit(1)
}

// Two valid states:
// 1. Normal commit: pkg is ONE AHEAD of commit msg (pre-commit bumped it)
// 2. Amend: pkg equals commit msg (bump was skipped to avoid double-bump)
const [___, __, committedCommit] = commitVersion.split('.').map(Number)
const [____, _____, pkgCommit] = pkgVersion.split('.').map(Number)

if (pkgCommit === committedCommit + 1) {
	console.log(
		`✅ Version consistent: commit=v${commitVersion}, next=v${pkgVersion}`,
	)
} else if (pkgCommit === committedCommit) {
	console.log(
		`✅ Version consistent: commit=v${commitVersion}, package.json=v${pkgVersion} (amend, no bump)`,
	)
} else {
	console.error(
		`❌ Version mismatch: commit=v${commitVersion} but package.json=v${pkgVersion}`,
	)
	console.error(
		`   Expected package.json to be at v${commitVersion.replace(/\d+$/, String(committedCommit + 1))}`,
	)
	process.exit(1)
}
