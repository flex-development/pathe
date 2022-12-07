/**
 * @file Unit Tests - formatExt
 * @module pathe/internal/tests/unit/formatExt
 */

import testSubject from '../format-ext'

describe('unit:internal/formatExt', () => {
  let ext: string

  beforeEach(() => {
    ext = '.mjs'
  })

  it('should do nothing if value begins with dot character', () => {
    expect(testSubject(ext)).to.equal(ext)
  })

  it('should return formatted file extension', () => {
    expect(testSubject(ext.slice(1))).to.equal(ext)
  })
})
