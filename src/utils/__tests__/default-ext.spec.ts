/**
 * @file Unit Tests - defaultExt
 * @module pathe/utils/tests/unit/defaultExt
 */

import testSubject from '../default-ext'

describe('unit:utils/defaultExt', () => {
  it('should return path with ext appended', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file', 'mjs', undefined, 'file.mjs'],
      ['file.', '.mjs', undefined, 'file.mjs'],
      ['file.min', 'mjs', ['.min'], 'file.min.mjs'],
      ['file.min', '.mjs', [null, '.min'] as string[], 'file.min.mjs']
    ]

    // Act + Expect
    cases.forEach(([path, ext, ignore, expected]) => {
      expect(testSubject(path, ext, ignore)).to.equal(expected)
    })
  })

  it('should return path without modications if ext is empty', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['file', '', undefined, 'file'],
      ['file', ' ', undefined, 'file'],
      ['file', null, undefined, 'file'],
      ['file', undefined, undefined, 'file']
    ]

    // Act + Expect
    cases.forEach(([path, ext, ignore, expected]) => {
      expect(testSubject(path, ext, ignore)).to.equal(expected)
    })
  })

  it('should return path without modications if path has extension', () => {
    expect(testSubject('file.mjs', '.mjs')).to.equal('file.mjs')
  })
})
