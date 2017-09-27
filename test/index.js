const test = require('tape')
const moment = require('moment')
const date = moment().format('YYYY-MM-DD')
const fs = require('fs')
const path = require('path')

const carriageReturn = require('../')

test('go to the next minor version', t => {
  const expected = fs.readFileSync(path.join(__dirname, './after.md')).toString().replace('{{date}}', date)
  const changelog = carriageReturn(path.join(__dirname, './before.md'), 'minor')
  fs.writeFileSync('./inspect.md', changelog)
  t.equal(changelog, expected, 'upgraded minor version')
  t.end()
})
