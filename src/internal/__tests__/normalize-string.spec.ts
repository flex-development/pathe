/**
 * @file Unit Tests - normalizeString
 * @module pathe/internal/tests/unit/normalizeString
 */

import testSubject from '../normalize-string'

describe('unit:internal/normalizeString', () => {
  it('should return normalized string', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['', undefined, ''],
      [' ', undefined, ' '],
      ['../.../.././.../../../bar', undefined, '../../bar'],
      ['../.../../foobar/../../../bar/../../baz', undefined, '../../../../baz'],
      ['../../../foo/../../../bar', undefined, '../../../../../bar'],
      ['../../../foo/../../../bar/../../', undefined, '../../../../../..'],
      ['../foo../../../bar', undefined, '../../bar'],
      ['../foobar/barfoo/foo/../../../bar/../../', undefined, '../..'],
      ['./fixtures///b/../b/c.js', undefined, 'fixtures/b/c.js'],
      ['///..//./foo/.//bar', undefined, 'foo/bar'],
      ['/a/b/c/../../../x/y/z', undefined, 'x/y/z'],
      ['/foo/../../../bar', undefined, 'bar'],
      ['a//b//.', undefined, 'a/b'],
      ['a//b//../b', undefined, 'a/b'],
      ['a//b//./c', undefined, 'a/b/c'],
      ['bar/foo..', undefined, 'bar/foo..'],
      ['bar/foo../..', undefined, 'bar'],
      ['bar/foo../../', undefined, 'bar'],
      ['bar/foo../../baz', undefined, 'bar/baz'],
      ['foo', undefined, 'foo'],
      ['foo/bar/foo/bar/foo/../../../bar/../../', undefined, 'foo']
    ]

    // Act + Expect
    cases.forEach(([path, allow_above_root, expected]) => {
      expect(testSubject(path, allow_above_root)).to.equal(expected)
    })
  })

  describe('windows', () => {
    it('should return normalized string', () => {
      // Arrange
      const cases: [...Parameters<typeof testSubject>, string][] = [
        ['', undefined, ''],
        [' ', undefined, ' '],
        ['..\\...\\..\\.\\...\\..\\..\\bar', undefined, '../../bar'],
        ['..\\..\\..\\foo\\..\\..\\..\\bar', undefined, '../../../../../bar'],
        ['..\\foo..\\..\\..\\bar', undefined, '../../bar'],
        ['.\\fixtures\\\\\\b\\..\\b\\c.js', undefined, 'fixtures/b/c.js'],
        ['C:', undefined, 'C:'],
        ['C:..\\..\\abc\\..\\def', undefined, 'def'],
        ['C:..\\abc', undefined, 'C:../abc'],
        ['C:\\.', undefined, 'C:'],
        ['\\\\host\\share\\dir\\foo.txt', undefined, 'host/share/dir/foo.txt'],
        ['\\a\\b\\c\\..\\..\\..\\x\\y\\z', undefined, 'x/y/z'],
        ['\\foo\\..\\..\\..\\bar', undefined, 'bar'],
        ['a\\\\b\\\\.', undefined, 'a/b'],
        ['a\\\\b\\\\..\\b', undefined, 'a/b'],
        ['a\\\\b\\\\.\\c', undefined, 'a/b/c'],
        ['bar\\foo..', undefined, 'bar/foo..'],
        ['bar\\foo..\\', undefined, 'bar/foo..'],
        ['bar\\foo..\\..', undefined, 'bar'],
        ['bar\\foo..\\..\\', undefined, 'bar'],
        ['bar\\foo..\\..\\baz', undefined, 'bar/baz'],
        ['file:stream', undefined, 'file:stream'],
        ['foo\\bar\\baz', undefined, 'foo/bar/baz']
      ]

      // Act + Expect
      cases.forEach(([path, allow_above_root, expected]) => {
        expect(testSubject(path, allow_above_root)).to.equal(expected)
      })
    })
  })
})
