/**
 * @file Unit Tests - toNamespacedPath
 * @module pathe/lib/tests/unit/toNamespacedPath
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-makelong.js
 */

import sep from '#src/lib/sep'
import { cast, set } from '@flex-development/tutils'
import { posix, win32 } from 'node:path'
import testSubject from '../to-namespaced-path'

describe('unit:lib/toNamespacedPath', () => {
  it('should return path if path is not drive path or unc path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      ['/foo/bar'],
      ['foo/bar'],
      [cast(null)]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.toNamespacedPath(path))
    })
  })

  describe('windows', () => {
    beforeAll(() => {
      set(process.env, '=R:', 'R:' + process.cwd())
    })

    /**
     * Converts Windows-style path separators (`\`) to POSIX (`/`).
     *
     * @param {string} path - Path to normalize
     * @return {string} `path` normalized
     */
    const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

    it('should return namespace-prefixed path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        ['C:'],
        ['C:\\file.txt'],
        ['R:'],
        ['R:\\file.txt'],
        ['\\\\.\\pipe\\somepipe'],
        ['\\\\?\\UNC\\someserver\\someshare\\somefile'],
        ['\\\\?\\foo'],
        ['\\\\file.txt'],
        ['\\\\foo\\bar'],
        ['\\\\someserver\\someshare\\somefile'],
        ['\\file.txt'],
        ['file.txt']
      ]

      // Act + Expect
      cases.forEach(([p]) => {
        expect(testSubject(p)).to.equal(ensurePosix(win32.toNamespacedPath(p)))
      })
    })
  })
})
