/**
 * @file Unit Tests - relative
 * @module pathe/lib/tests/unit/relative
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-relative.js
 */

import process from '#internal/process'
import testSubject from '#lib/relative'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'
import { posix, win32 } from 'node:path'

describe('unit:lib/relative', () => {
  describe('posix', () => {
    it.each<[string, string]>([
      ['', ''],
      ['/Users/a/web/b/test/mails', '/Users/a/web/b'],
      ['/baz', '/baz-quux'],
      ['/baz-quux', '/baz'],
      ['/foo/bar', '/foo/bar/baz'],
      ['/foo/bar', posix.sep],
      ['/foo/bar/baz', '/foo/bar'],
      ['/foo/bar/baz', '/foo/bar/baz-quux'],
      ['/foo/bar/baz-quux', '/foo/bar/baz'],
      ['/foo/test', '/foo/test/bar/package.json'],
      ['/page1/page2/foo', posix.sep],
      ['/var/', '/var/lib'],
      ['/var/lib', '/bin'],
      ['/var/lib', '/var'],
      ['/var/lib', '/var/apache'],
      ['/var/lib', '/var/lib'],
      [posix.sep, '/foo'],
      [posix.sep, '/var/lib']
    ])('should return relative path (%j, %j)', (from, to) => {
      // Act
      const result = testSubject(from, to)

      // Expect
      expect(result).to.eq(posix.relative(toPath(from), toPath(to)))
    })
  })

  describe('windows', () => {
    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it.each<[string, string]>([
      ['C:\\', 'C:\\foo'],
      ['C:\\baz', 'C:\\baz-quux'],
      ['C:\\baz', '\\\\foo\\bar\\baz'],
      ['C:\\baz-quux', 'C:\\baz'],
      ['C:\\foo\\bar', 'C:\\'],
      ['C:\\foo\\bar', 'C:\\foo'],
      ['C:\\foo\\bar', 'C:\\foo\\bar\\baz'],
      ['C:\\foo\\bar\\baz', 'C:\\foo\\bar\\baz-quux'],
      ['C:\\foo\\bar\\baz-quux', 'C:\\foo\\bar\\baz'],
      ['C:\\foo\\bar\\baz\\quux', 'C:\\'],
      ['C:\\foo\\test', 'C:\\foo\\test\\bar\\package.json'],
      ['P:\\', '\\package.json'],
      ['P:\\', 'package.json'],
      ['P:\\foo\\bar\\baz\\quux', 'P:\\'],
      ['P:\\foo\\test', 'P:\\foo\\test\\bar\\package.json'],
      ['T:\\foo\\bar', 'T:\\foo\\bar\\baz'],
      ['T:\\', '\\package.json'],
      ['T:\\', 'package.json'],
      ['\\\\foo\\bar', '\\\\foo\\bar\\baz'],
      ['\\\\foo\\bar\\baz', 'C:\\baz'],
      ['\\\\foo\\bar\\baz', 'T:\\baz'],
      ['\\\\foo\\bar\\baz', '\\\\foo\\bar'],
      ['\\\\foo\\bar\\baz', '\\\\foo\\bar\\baz-quux'],
      ['\\\\foo\\bar\\baz-quux', '\\\\foo\\bar\\baz'],
      ['\\\\foo\\baz', '\\\\foo\\baz-quux'],
      ['\\\\foo\\baz-quux', '\\\\foo\\baz'],
      ['c:/', 'c:\\aaaa\\bbbb'],
      ['c:/AaAa/bbbb', 'c:/aaaa/bbbb'],
      ['c:/aaaa/', 'c:/aaaa/cccc'],
      ['c:/aaaa/bbbb', 'c:/aaaa'],
      ['c:/aaaa/bbbb', 'c:/aaaa/bbbb'],
      ['c:/aaaa/bbbb', 'c:/aaaa/cccc'],
      ['c:/aaaa/bbbb', 'c:/cccc'],
      ['c:/aaaa/bbbb', 'd:\\'],
      ['c:/aaaaa/', 'c:/aaaa/cccc'],
      ['c:/blah\\blah', 'd:/games']
    ])('should return relative path (%j, %j)', (from, to) => {
      // Act
      const result = testSubject(from, to)

      // Expect
      expect(result).to.eq(toPosix(win32.relative(toPath(from), toPath(to))))
    })
  })
})
