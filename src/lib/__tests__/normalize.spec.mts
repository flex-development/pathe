/**
 * @file Unit Tests - normalize
 * @module pathe/lib/tests/unit/normalize
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-normalize.js
 */

import testSubject from '#lib/normalize'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/normalize', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
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
      [posix.sep]
    ])('should return normalized `path` (%j)', path => {
      expect(testSubject(path)).to.eq(posix.normalize(path))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [' '],
      [''],
      ['../.../.././.../../../bar'],
      ['../.../../foobar/../../../bar/../../baz'],
      ['../.../../foobar/../../../bar/../../baz'],
      ['../../../foo/../../../bar'],
      ['../../../foo/../../../bar'],
      ['../../../foo/../../../bar/../../'],
      ['../../../foo/../../../bar/../../'],
      ['../foo../../../bar'],
      ['../foobar/barfoo/foo/../../../bar/../../'],
      ['../foobar/barfoo/foo/../../../bar/../../'],
      ['..\\...\\..\\.\\...\\..\\..\\bar'],
      ['..\\foo..\\..\\..\\bar'],
      ['./'],
      ['./../'],
      ['./a/..'],
      ['./a/../'],
      ['./fixtures///b/../b/c.js'],
      ['///..//./foo/.//bar'],
      ['//foo//bar'],
      ['//foo/bar'],
      ['//server/share/dir/file.ext'],
      ['/a/..'],
      ['/a/b/c/../../../x/y/z'],
      ['/a/b/c/../../../x/y/z'],
      ['/foo/../../../bar'],
      ['/foo/../../../bar'],
      ['/foo/bar//baz/asdf/quux/..'],
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
      ['bar/foo..'],
      ['bar/foo../'],
      ['bar/foo../..'],
      ['bar/foo../../'],
      ['bar/foo../../baz'],
      ['bar\\foo..'],
      ['bar\\foo..\\'],
      ['bar\\foo..\\..'],
      ['bar\\foo..\\..\\'],
      ['bar\\foo..\\..\\baz'],
      ['file:stream'],
      ['foo\\'],
      ['foo\\bar\\baz'],
      [posix.sep],
      [win32.sep]
    ])('should return normalized `path` (%j)', path => {
      expect(testSubject(path)).to.eq(toPosix(win32.normalize(path)))
    })
  })
})
