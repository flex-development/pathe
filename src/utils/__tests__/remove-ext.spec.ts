/**
 * @file Unit Tests - removeExt
 * @module pathe/utils/tests/unit/removeExt
 */

import testSubject from '../remove-ext'

describe('unit:utils/removeExt', () => {
  it('should return path with ext removed', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file.mjs', 'mjs', 'file'],
      ['file.mts', 'mts', 'file'],
      ['file.mjs', '.mjs', 'file'],
      ['file.mts', '.mts', 'file'],
      ['file.d.mts', 'd.mts', 'file'],
      ['file.d.mts', '.d.mts', 'file']
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
