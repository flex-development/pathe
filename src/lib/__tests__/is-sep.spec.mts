/**
 * @file Unit Tests - isSep
 * @module pathe/lib/tests/unit/isSep
 */

import { sepWindows } from '#internal/constants'
import testSubject from '#lib/is-sep'
import sep from '#lib/sep'

describe('unit:lib/isSep', () => {
  it('should return `false` if `value` is not path separator', () => {
    expect(testSubject(faker.string.nanoid())).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [sep],
    [sepWindows]
  ])('should return `true` if `value` is path separator (%j)', value => {
    expect(testSubject(value)).to.be.true
  })
})
