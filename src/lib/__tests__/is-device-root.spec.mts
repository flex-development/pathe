/**
 * @file Unit Tests - isDeviceRoot
 * @module pathe/lib/tests/unit/isDeviceRoot
 */

import testSubject from '#lib/is-device-root'
import { posix, win32 } from 'node:path'

describe('unit:lib/isDeviceRoot', () => {
  it.each<Parameters<typeof testSubject>>([
    [''],
    ['f:'],
    [import.meta.url],
    [null]
  ])('should return `false` if `value` is not device root (%#)', path => {
    expect(testSubject(path)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    ['P:' + posix.sep],
    ['W:' + win32.sep],
    ['p:' + posix.sep],
    ['w:' + posix.sep]
  ])('should return `true` if `value` is device root (%j)', path => {
    expect(testSubject(path)).to.be.true
  })
})
