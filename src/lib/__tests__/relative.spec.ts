/**
 * @file Unit Tests - relative
 * @module pathe/lib/tests/unit/relative
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-relative.js
 */

import sep from '#src/lib/sep'
import { set } from '@flex-development/tutils'
import { posix, win32 } from 'node:path'
import testSubject from '../relative'

describe('unit:lib/relative', () => {
  it('should return relative path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
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
      [posix.sep, '/var/lib'],
      [process.cwd(), import.meta.url]
    ]

    // Act + Expect
    cases.forEach(([from, to]) => {
      expect(testSubject(from, to)).to.equal(posix.relative(from, to))
    })
  })

  describe('windows', () => {
    beforeAll(() => {
      set(process.env, '=P:', 'P:' + process.cwd())
    })

    /**
     * Converts Windows-style path separators (`\`) to POSIX (`/`).
     *
     * @param {string} path - Path to normalize
     * @return {string} `path` normalized
     */
    const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

    it('should return relative path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        ['\\\\foo\\bar', '\\\\foo\\bar\\baz'],
        ['\\\\foo\\bar\\baz', 'C:\\baz'],
        ['\\\\foo\\bar\\baz', '\\\\foo\\bar'],
        ['\\\\foo\\bar\\baz', '\\\\foo\\bar\\baz-quux'],
        ['\\\\foo\\bar\\baz-quux', '\\\\foo\\bar\\baz'],
        ['\\\\foo\\baz', '\\\\foo\\baz-quux'],
        ['\\\\foo\\baz-quux', '\\\\foo\\baz'],
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
      ]

      // Act + Expect
      cases.forEach(([f, t]) => {
        expect(testSubject(f, t)).to.equal(ensurePosix(win32.relative(f, t)))
      })
    })
  })
})
