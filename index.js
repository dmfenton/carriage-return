const fs = require('fs')
const _ = require('lodash')
const semver = require('semver')
const moment = require('moment')

const unreleasedLink = new RegExp(/\[Unreleased\]: (https:\/\/.+)(?=\/compare)/)

module.exports = function (file, level) {
  const changelog = fs.readFileSync(file).toString()
  const oldVersion = parseOldVersion(changelog)
  const newVersion = semver.inc(oldVersion, level)
  const lines = changelog.split('\n')
  return lines.map(line => {
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
}

function updateVersion(existing, newVersion) {
  const date = moment().format('YYYY-MM-DD')
  return [
    '## [Unreleased]',
    '### Added',
    '### Changed',
    '### Fixed',
    '### Removed',
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

function updateLinks(existing, oldVersion, newVersion, url) {
  return [
    `[Unreleased]: ${url}/compare/v${newVersion}...HEAD`,
    `[${newVersion}]: ${url}/compare/v${oldVersion}...v${newVersion}`
  ]
}
