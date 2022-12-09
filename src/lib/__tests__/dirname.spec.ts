/**
 * @file Unit Tests - dirname
 * @module pathe/lib/tests/unit/dirname
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-dirname.js
 */

import sep from '#src/lib/sep'
import { posix, win32 } from 'node:path'
import testSubject from '../dirname'

describe('unit:lib/dirname', () => {
  /**
   * Converts Windows-style path separators (`\`) to POSIX (`/`).
   *
   * @param {string} path - Path to normalize
   * @return {string} `path` normalized
   */
  const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

  it('should return directory name of path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      ['//a'],
      ['/a'],
      ['/a/b'],
      ['/a/b/'],
      ['a'],
      ['foo'],
      [posix.sep],
      [posix.sep.repeat(4)]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.dirname(path))
    })
  })

  describe('windows', () => {
    it('should return directory name of path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [''],
        ['/a'],
        ['/a/b'],
        ['/a/b/'],
        ['\\\\unc\\share'],
        ['\\\\unc\\share\\foo'],
        ['\\\\unc\\share\\foo\\'],
        ['\\\\unc\\share\\foo\\bar'],
        ['\\\\unc\\share\\foo\\bar\\'],
        ['\\\\unc\\share\\foo\\bar\\baz'],
        ['\\foo bar\\baz'],
        ['\\foo'],
        ['\\foo\\'],
        ['\\foo\\bar'],
        ['\\foo\\bar\\'],
        ['\\foo\\bar\\baz'],
        ['a'],
        ['c:'],
        ['c:\\'],
        ['c:\\foo bar\\baz'],
        ['c:\\foo'],
        ['c:\\foo\\'],
        ['c:\\foo\\bar'],
        ['c:\\foo\\bar\\'],
        ['c:\\foo\\bar\\baz'],
        ['c:foo bar\\baz'],
        ['c:foo'],
        ['c:foo\\'],
        ['c:foo\\bar'],
        ['c:foo\\bar\\'],
        ['c:foo\\bar\\baz'],
        ['dir\\file:stream'],
        ['file:stream'],
        ['foo'],
        [posix.sep],
        [posix.sep.repeat(4)],
        [win32.sep],
        [win32.sep.repeat(2)]
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.equal(ensurePosix(win32.dirname(path)))
      })
    })
  })
})
