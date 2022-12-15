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

  it('should return empty string if ext is empty', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['', ''],
      [' ', ''],
      [undefined, '']
    ]

    // Act + Expect
    cases.forEach(([ext, expected]) => {
      expect(testSubject(ext)).to.equal(expected)
    })
  })

  it('should return ext if ext starts with dot character', () => {
    expect(testSubject(ext)).to.equal(ext)
  })

  it('should return formatted file extension', () => {
    expect(testSubject(ext.slice(1))).to.equal(ext)
  })
})
