/**
 * @file Unit Tests - join
 * @module pathe/lib/tests/unit/join
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-join.js
 */

import sep from '#src/lib/sep'
import { DOT } from '@flex-development/tutils'
import { posix, win32 } from 'node:path'
import testSubject from '../join'

describe('unit:lib/join', () => {
  it('should return joined path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [],
      [''],
      ['', ''],
      ['', '', 'foo'],
      ['', '', '/foo'],
      ['', '..', '..', '/foo'],
      ['', '/foo'],
      ['', 'foo'],
      ['', DOT],
      ['', posix.sep, '/foo'],
      ['', posix.sep, 'foo'],
      [' ', ''],
      [' ', 'foo'],
      [' ', DOT],
      [' ', posix.sep],
      [' /foo'],
      ['./', '..', '..', '/foo'],
      ['./', '..', '/foo'],
      ['./'],
      ['/.', 'x/b', '..', '/b/c.js'],
      ['/foo', '../../../bar'],
      ['foo', '', '/bar'],
      ['foo', ''],
      ['foo', '../../../bar'],
      ['foo', '/bar'],
      ['foo/', ''],
      ['foo/', '../../../bar'],
      ['foo/x', '../../../bar'],
      ['foo/x', './bar'],
      ['foo/x/', './bar'],
      ['foo/x/', DOT, 'bar'],
      [DOT, '..', '..', '/foo'],
      [DOT, './', DOT],
      [DOT, './'],
      [DOT, '/./', DOT],
      [DOT, '/////./', DOT],
      [DOT, 'x/b', '..', '/b/c.js'],
      [DOT, DOT, DOT],
      [DOT],
      [posix.sep, '', '/foo'],
      [posix.sep, '..', '..'],
      [posix.sep, '..'],
      [posix.sep, '//foo'],
      [posix.sep, '/foo'],
      [posix.sep, 'foo'],
      [posix.sep, DOT],
      [posix.sep]
    ]

    // Act + Expect
    cases.forEach(paths => {
      expect(testSubject(...paths)).to.equal(posix.join(...paths))
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

    it('should return joined path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        ['', '//foo', 'bar'],
        ['', '//foo/', '/bar'],
        ['', '//foo/', 'bar'],
        ['', 'c:'],
        ['', posix.sep, '/foo/bar'],
        ['//', '/foo/bar'],
        ['//', 'foo/bar'],
        ['//'],
        ['////foo', 'bar'],
        ['///foo/bar'],
        ['//foo', '', 'bar'],
        ['//foo', '', posix.sep],
        ['//foo', '/bar'],
        ['//foo', 'bar'],
        ['//foo', posix.sep],
        ['//foo'],
        ['//foo/', '', '/bar'],
        ['//foo/', '', 'bar'],
        ['//foo/', 'bar'],
        ['//foo/'],
        ['//foo/bar'],
        ['\\/foo/bar'],
        ['\\\\\\/foo/bar'],
        ['\\\\foo/bar'],
        ['\\\\server', 'share'],
        ['c:', ''],
        ['c:', 'file'],
        ['c:', posix.sep],
        ['c:'],
        ['c:.', 'file'],
        ['c:.', posix.sep],
        ['c:.'],
        [win32.sep, '/foo/bar'],
        [win32.sep, 'foo/bar'],
        [win32.sep.repeat(2), posix.sep, '/foo/bar']
      ]

      // Act + Expect
      cases.forEach(p => {
        expect(testSubject(...p)).to.equal(ensurePosix(win32.join(...p)))
      })
    })
  })
})
