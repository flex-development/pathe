/**
 * @file Unit Tests - addExt
 * @module pathe/utils/tests/unit/addExt
 */

import testSubject from '../add-ext'

describe('unit:utils/addExt', () => {
  it('should return path with ext appended', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file', 'mjs', 'file.mjs'],
      ['file', '.mjs', 'file.mjs'],
      ['file.', 'mjs', 'file.mjs'],
      ['file.', '.mjs', 'file.mjs'],
      ['file.min', 'mjs', 'file.min.mjs'],
      ['file.min', '.mjs', 'file.min.mjs'],
      ['file.min.', 'mjs', 'file.min.mjs'],
      ['file.min.', '.mjs', 'file.min.mjs']
    ]

    // Act + Expect
    cases.forEach(([path, ext, expected]) => {
      expect(testSubject(path, ext)).to.equal(expected)
    })
  })

  it('should return path without modications if ext is empty', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file', '', 'file'],
      ['file', ' ', 'file'],
      ['file', null, 'file'],
      ['file', undefined, 'file']
    ]

    // Act + Expect
    cases.forEach(([path, ext, expected]) => {
      expect(testSubject(path, ext)).to.equal(expected)
    })
  })

  it('should return path without modications if path ends with ext', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file.mjs', 'mjs', 'file.mjs'],
      ['file.mjs', '.mjs', 'file.mjs']
    ]

    // Act + Expect
    cases.forEach(([path, ext, expected]) => {
      expect(testSubject(path, ext)).to.equal(expected)
    })
  })
})
