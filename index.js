const fs = require('fs')
const semver = require('semver')
const moment = require('moment')

const unreleasedLink = new RegExp(/\[Unreleased\]: (https:\/\/.+)(?=\/compare)/)

module.exports = function (options) {
  let changelog = fs.readFileSync(options.file).toString()
  const oldVersion = parseOldVersion(changelog)
  const newVersion = options.newVersion || semver.inc(oldVersion, options.level)

  if (!newVersion) throw new Error('You must specify a new version or a semver change')
  console.log(`Moving from ${oldVersion} to ${newVersion} in ${options.file}`)

  // remove empty sections from the changelog
  changelog = changelog
    .replace(/### (?:Added|Changed|Removed|Fixed|Breaking)(?=\n###)/g, '\n')
    .replace(/### (?:Added|Changed|Removed|Fixed|Breaking)(?=\n\n##)/g, '')

  return changelog
    .split('\n')
    .map(line => {
      if (line === '## [Unreleased]') {
        return updateVersion(line, newVersion).join('\n')
      } else if (line.match(unreleasedLink)) {
        const url = parseUrl(changelog)
        return updateLinks(line, oldVersion, newVersion, url).join('\n')
      } else {
        return line
      }
    })
    .reduce((lines, line) => {
      return [lines, line].join('\n')
    })
    .replace(/\n{3,}/g, '\n\n')
}

function updateVersion (existing, newVersion) {
  const date = moment().format('YYYY-MM-DD')
  return [
    '## [Unreleased]',
    '### Added',
    '### Changed',
    '### Fixed',
    '### Removed',
    '### Breaking',
    '',
    `## [${newVersion}] - ${date}`
  ]
}

function parseOldVersion (changelog) {
  return changelog.match(/\[(\d+\.\d+\.\d+)\](?=: https)/)[1]
}

function parseUrl (changelog) {
  return changelog.match(unreleasedLink)[1]
}

function updateLinks (existing, oldVersion, newVersion, url) {
  return [
    `[Unreleased]: ${url}/compare/v${newVersion}...HEAD`,
    `[${newVersion}]: ${url}/compare/v${oldVersion}...v${newVersion}`
  ]
}
