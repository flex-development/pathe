/**
 * @file Unit Tests - formatExt
 * @module pathe/utils/tests/unit/formatExt
 */

import type { Ext } from '#src/types'
import testSubject from '../format-ext'

describe('unit:utils/formatExt', () => {
  let ext: Ext

  beforeEach(() => {
    ext = '.mjs'
  })

  it('should return empty string if ext is empty string', () => {
    expect(testSubject('')).to.equal('')
  })

  it('should return ext without modifications if ext starts with dot', () => {
    expect(testSubject(ext)).to.equal(ext)
  })

  it('should return formatted file extension', () => {
    expect(testSubject(ext.slice(1))).to.equal(ext)
  })
})
