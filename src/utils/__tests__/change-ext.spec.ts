/**
 * @file Unit Tests - changeExt
 * @module pathe/utils/tests/unit/changeExt
 */

import testSubject from '../change-ext'

describe('unit:utils/changeExt', () => {
  it('should return path with new file extension', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file', 'mjs', 'file.mjs'],
      ['file', 'mts', 'file.mts'],
      ['file.', '.mjs', 'file.mjs'],
      ['file.', '.mts', 'file.mts'],
      ['file.mts', 'd.mts', 'file.d.mts'],
      ['file.min.cjs', '.mjs', 'file.min.mjs']
    ]

    // Act + Expect
    cases.forEach(([path, ext, expected]) => {
      expect(testSubject(path, ext)).to.equal(expected)
    })
  })

  it('should return path without modications if ext is empty', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file.cjs', '', 'file.cjs'],
      ['file.cts', ' ', 'file.cts'],
      ['file.mjs', null, 'file.mjs'],
      ['file.mts', undefined, 'file.mts']
    ]

    // Act + Expect
    cases.forEach(([path, ext, expected]) => {
      expect(testSubject(path, ext)).to.equal(expected)
    })
  })
})
