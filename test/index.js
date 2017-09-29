const test = require('tape')
const moment = require('moment')
const date = moment().format('YYYY-MM-DD')
const fs = require('fs')
const path = require('path')

const carriageReturn = require('../')

test('go to the next minor version', t => {
  const expected = fs.readFileSync(path.join(__dirname, './after.md')).toString().replace('{{date}}', date)
  const changelog = carriageReturn({ file: path.join(__dirname, './before.md'), level: 'minor' })
  t.equal(changelog, expected, 'upgraded minor version')
  t.end()
})

test('go to the specified version', t => {
  const expected = fs.readFileSync(path.join(__dirname, './after.md')).toString().replace('{{date}}', date)
  const changelog = carriageReturn({ file: path.join(__dirname, './before.md'), newVersion: '1.1.0' })
  t.equal(changelog, expected, 'upgraded to 1.1.0')
  t.end()
})
