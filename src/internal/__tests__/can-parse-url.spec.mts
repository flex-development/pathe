/**
 * @file Unit Tests - canParseURL
 * @module pathe/internal/tests/unit/canParseURL
 */

import testSubject from '#internal/can-parse-url'
import dot from '#lib/dot'
import { posix, win32 } from 'node:path'

describe('unit:internal/canParseURL', () => {
  it.each<Parameters<typeof testSubject>>([
    ['t' + posix.delimiter + win32.sep + 'package.json'],
    [dot.repeat(2) + posix.sep + 'to-path.mts'],
    [dot],
    [posix.sep + 'package.json'],
    [posix.sep],
    [win32.sep]
  ])('should return `false` if `input` cannot be parsed to URL (%#)', input => {
    expect(testSubject(input)).to.be.false
  })

  it('should return `true` if `input` can be parsed to URL', () => {
    expect(testSubject(import.meta.url)).to.be.true
  })
})
