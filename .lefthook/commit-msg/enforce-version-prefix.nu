#!/usr/bin/env nu
# Validates v{YY}{M}.{MINOR}.{COMMIT} prefix AND match with package version.
# Allows amend: message version may match HEAD's version instead of pkg (which is HEAD+1).
# Package paths: .lefthook/version-files.jsonc (default: ["package.json"])

def pkg_files [] {
  try {
    let files = (open --raw .lefthook/version-files.jsonc | from json)
    if ($files | length) > 0 { $files } else { ['package.json'] }
  } catch {
    ['package.json']
  }
}

def main [input_file: string] {
  if ($input_file | str length) == 0 {
    print '❌ No input file provided'
    exit 1
  }

  let first_line = (open --raw $input_file | lines | first)
  let files = (pkg_files)

  # Regex: v{digits.digits.digits} - {type}: {description}
  # Types match conventional commits spec
  if not ($first_line =~ '^v(\d+\.\d+\.\d+) - (feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert): .+') {
    print ''
    print '❌ Invalid commit message format.'
    print ''
    print 'Expected: v{YY}{M}.{MINOR}.{COMMIT} - {type}: {description}'
    print ''
    print 'Valid types: feat, fix, chore, docs, style, refactor, perf, test, build, ci, revert'
    print ''

    let pkg_version = (open --raw ($files | first) | from json | get version?)
    if ($pkg_version != null) {
      print ('  Next commit should be: v' + ($pkg_version | into string) + ' - type: description')
    }
    print ''
    exit 1
  }

  # Extract version from commit message
  let parsed = ($first_line | parse --regex '^v(?P<version>\d+\.\d+\.\d+) - ')
  let version = ($parsed | get version.0)
  let version_str = ('v' + $version)

  # Verify all listed package files are in sync
  let versions = ($files | each {|f| open --raw $f | from json | get version})
  let unique = ($versions | uniq)
  if ($unique | length) > 1 {
    print ''
    print '❌ Versions out of sync:'
    for i in 0..(($files | length) - 1) {
      print ('   ' + ($files | get $i) + ': ' + ($versions | get $i))
    }
    exit 1
  }
  let pkg_version = ($unique | first)

  if ($pkg_version == null) {
    print ''
    print '❌ No version field in package.json'
    exit 1
  }

  # Detect amend: the message version matches HEAD's existing version.
  # (For a fresh commit, the message version should match pkg = HEAD + 1.)
  let head_version = (try {
    git log -1 --pretty=%s | parse --regex '^v(?P<v>\d+\.\d+\.\d+) - ' | get v.0
  } catch { null })
  let is_amend = ($head_version != null and $version == $head_version)

  if ($version != $pkg_version) {
    if $is_amend {
      print ('⚠️  Amend: ' + $version_str + ' (pkg at v' + ($pkg_version | into string) + ') — allowed')
      exit 0
    }
    print ''
    print '❌ Version mismatch.'
    print ''
    print ('   Commit message:  ' + $version_str)
    print ('   package.json:    v' + ($pkg_version | into string))
    print ''
    print '   Fresh commit: version must match package.json.'
    print '   Amend:          version must match HEAD (the commit being amended).'
    print ''
    exit 1
  }

  print ('✅ Version matched: ' + $version_str)
  exit 0
}
