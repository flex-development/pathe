/**
 * @file Unit Tests - isURL
 * @module pathe/internal/tests/unit/isURL
 */

import testSubject from '../is-url'

describe('unit:internal/isURL', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    ['https://github.com/flex-development/errnode'],
    [{ href: 'file://host/a', path: '/a', pathname: '/a', protocol: 'file:' }]
  ])('should return `false` if `value` is not URL-like (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [new URL('https://github.com/flex-development/pathe')],
    [{ href: 'file:///', pathname: '/', protocol: 'file:' }]
  ])('should return `true` if `value` is URL-like (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
