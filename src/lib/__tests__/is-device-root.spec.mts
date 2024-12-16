/**
 * @file Unit Tests - isDeviceRoot
 * @module pathe/lib/tests/unit/isDeviceRoot
 */

import DEVICE_ROOT from '#fixtures/device-root'
import DRIVE from '#fixtures/drive'
import testSubject from '#lib/is-device-root'
import { posix } from 'node:path'

describe('unit:lib/isDeviceRoot', () => {
  it.each<Parameters<typeof testSubject>>([
    [''],
    [DRIVE],
    [import.meta.url],
    [null]
  ])('should return `false` if `value` is not device root (%#)', path => {
    expect(testSubject(path)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [DRIVE + posix.sep],
    [DEVICE_ROOT],
    [DRIVE.toLowerCase() + posix.sep],
    [DEVICE_ROOT.toLowerCase()]
  ])('should return `true` if `value` is device root (%j)', path => {
    expect(testSubject(path)).to.be.true
  })
})
