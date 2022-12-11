/**
 * @file Unit Tests - normalize
 * @module pathe/lib/tests/unit/normalize
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-normalize.js
 */

import sep from '#src/lib/sep'
import { posix, win32 } from 'node:path'
import testSubject from '../normalize'

describe('unit:lib/normalize', () => {
  it('should return normalized path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      [' '],
      ['../.../.././.../../../bar'],
      ['../.../../foobar/../../../bar/../../baz'],
      ['../../../foo/../../../bar'],
      ['../../../foo/../../../bar/../../'],
      ['../foo../../../bar'],
      ['../foobar/barfoo/foo/../../../bar/../../'],
      ['./'],
      ['./../'],
      ['./a/..'],
      ['./a/../'],
      ['./fixtures///b/../b/c.js'],
      ['///..//./foo/.//bar'],
      ['/a/..'],
      ['/a/b/c/../../../x/y/z'],
      ['/foo/../../../bar'],
      ['/foo/bar//baz/asdf/quux/..'],
      ['a//b//.'],
      ['a//b//../b'],
      ['a//b//./c'],
      ['bar/foo..'],
      ['bar/foo../'],
      ['bar/foo../..'],
      ['bar/foo../../'],
      ['bar/foo../../baz'],
      [import.meta.url],
      [posix.sep]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.normalize(path))
    })
  })

  describe('windows', () => {
    /**
     * Converts Windows-style path separators (`\`) to POSIX (`/`).
     *
     * @param {string} path - Path to normalize
     * @return {string} `path` normalized
     */
    const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

    it('should return normalized path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [''],
        [' '],
        ['../.../../foobar/../../../bar/../../baz'],
        ['../../../foo/../../../bar'],
        ['../../../foo/../../../bar/../../'],
        ['../foobar/barfoo/foo/../../../bar/../../'],
        ['..\\...\\..\\.\\...\\..\\..\\bar'],
        ['..\\foo..\\..\\..\\bar'],
        ['./fixtures///b/../b/c.js'],
        ['//foo//bar'],
        ['//foo/bar'],
        ['//server/share/dir/file.ext'],
        ['/a/b/c/../../../x/y/z'],
        ['/foo/../../../bar'],
        ['C:'],
        ['C:..\\..\\abc\\..\\def'],
        ['C:..\\abc'],
        ['C:\\'],
        ['C:\\.'],
        ['C:\\temp\\..'],
        ['\\\\.\\c:\\temp\\file\\..\\path'],
        ['\\\\.\\foo\\bar'],
        ['\\\\.\\host\\share\\dir\\file.txt\\'],
        ['\\\\C:\\foo\\bar'],
        ['\\\\server/share/file/../path'],
        ['\\\\server\\share\\file\\..\\path'],
        ['a//b//.'],
        ['a//b//../b'],
        ['a//b//./c'],
        ['bar\\foo..'],
        ['bar\\foo..\\'],
        ['bar\\foo..\\..'],
        ['bar\\foo..\\..\\'],
        ['bar\\foo..\\..\\baz'],
        ['file:stream'],
        ['foo\\'],
        ['foo\\bar\\baz'],
        [import.meta.url],
        [win32.sep]
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.equal(ensurePosix(win32.normalize(path)))
      })
    })
  })
})
