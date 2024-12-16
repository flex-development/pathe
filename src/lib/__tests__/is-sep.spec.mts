/**
 * @file Unit Tests - isSep
 * @module pathe/lib/tests/unit/isSep
 */

import testSubject from '#lib/is-sep'
import { posix, win32 } from 'node:path'

describe('unit:lib/isSep', () => {
  it('should return `false` if `value` is not path separator', () => {
    expect(testSubject(faker.string.nanoid())).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [posix.sep],
    [win32.sep]
  ])('should return `true` if `value` is path separator (%j)', value => {
    expect(testSubject(value)).to.be.true
  })
})
