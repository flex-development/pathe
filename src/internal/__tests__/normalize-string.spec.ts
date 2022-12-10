/**
 * @file Unit Tests - normalizeString
 * @module pathe/internal/tests/unit/normalizeString
 */

import testSubject from '../normalize-string'

describe('unit:internal/normalizeString', () => {
  it('should return normalized string', () => {
    // Arrange
    const cases: [...Parameters<typeof testSubject>, string][] = [
      ['', ''],
      [' ', ' '],
      ['../.../.././.../../../bar', '../../bar'],
      ['../.../../foobar/../../../bar/../../baz', '../../../../baz'],
      ['../../../foo/../../../bar', '../../../../../bar'],
      ['../../../foo/../../../bar/../../', '../../../../../..'],
      ['../foo../../../bar', '../../bar'],
      ['../foobar/barfoo/foo/../../../bar/../../', '../..'],
      ['./fixtures///b/../b/c.js', 'fixtures/b/c.js'],
      ['///..//./foo/.//bar', 'foo/bar'],
      ['/a/b/c/../../../x/y/z', 'x/y/z'],
      ['/foo/../../../bar', 'bar'],
      ['a//b//.', 'a/b'],
      ['a//b//../b', 'a/b'],
      ['a//b//./c', 'a/b/c'],
      ['bar/foo..', 'bar/foo..'],
      ['bar/foo../..', 'bar'],
      ['bar/foo../../', 'bar'],
      ['bar/foo../../baz', 'bar/baz'],
      ['foo', 'foo'],
      ['foo/bar/foo/bar/foo/../../../bar/../../', 'foo']
    ]

    // Act + Expect
    cases.forEach(([path, expected]) => {
      expect(testSubject(path)).to.equal(expected)
    })
  })

  describe('windows', () => {
    it('should return normalized string', () => {
      // Arrange
      const cases: [...Parameters<typeof testSubject>, string][] = [
        ['', ''],
        [' ', ' '],
        ['..\\...\\..\\.\\...\\..\\..\\bar', '../../bar'],
        ['..\\..\\..\\foo\\..\\..\\..\\bar', '../../../../../bar'],
        ['..\\..\\..\\foo\\..\\..\\..\\bar\\..\\..\\', '../../../../../..'],
        ['..\\foo..\\..\\..\\bar', '../../bar'],
        ['..\\foobar\\barfoo\\foo\\..\\..\\..\\bar\\..\\..\\', '../..'],
        ['.\\fixtures\\\\\\b\\..\\b\\c.js', 'fixtures/b/c.js'],
        ['C:', 'C:'],
        ['C:..\\..\\abc\\..\\def', 'def'],
        ['C:..\\abc', 'C:../abc'],
        ['C:\\.', 'C:'],
        ['\\\\server\\share\\dir\\file.ext', 'server/share/dir/file.ext'],
        ['\\a\\b\\c\\..\\..\\..\\x\\y\\z', 'x/y/z'],
        ['\\foo\\..\\..\\..\\bar', 'bar'],
        ['a\\\\b\\\\.', 'a/b'],
        ['a\\\\b\\\\..\\b', 'a/b'],
        ['a\\\\b\\\\.\\c', 'a/b/c'],
        ['bar\\foo..', 'bar/foo..'],
        ['bar\\foo..\\', 'bar/foo..'],
        ['bar\\foo..\\..', 'bar'],
        ['bar\\foo..\\..\\', 'bar'],
        ['bar\\foo..\\..\\baz', 'bar/baz'],
        ['file:stream', 'file:stream'],
        ['foo\\bar\\baz', 'foo/bar/baz']
      ]

      // Act + Expect
      cases.forEach(([path, expected]) => {
        expect(testSubject(path)).to.equal(expected)
      })
    })
  })
})
