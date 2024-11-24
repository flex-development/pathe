/**
 * @file Unit Tests - isURL
 * @module pathe/lib/tests/unit/isURL
 */

import testSubject from '#lib/is-url'

describe('unit:lib/isURL', () => {
  it('should return `false` if `value` is not url', () => {
    expect(testSubject(null)).to.be.false
  })

  it('should return `true` if `value` can be parsed to URL', () => {
    expect(testSubject(import.meta.url)).to.be.true
  })

  it('should return `true` if `value` is URL object', () => {
    expect(testSubject(new URL(import.meta.url))).to.be.true
  })
})
