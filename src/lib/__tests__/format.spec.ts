/**
 * @file Unit Tests - format
 * @module pathe/lib/tests/unit/format
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-parse-format.js
 */

import sep from '#src/lib/sep'
import { posix, win32 } from 'node:path'
import testSubject from '../format'

describe('unit:lib/format', () => {
  /**
   * Converts Windows-style path separators (`\`) to POSIX (`/`).
   *
   * @param {string} path - Path to normalize
   * @return {string} `path` normalized
   */
  const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

  it('should return path string from object', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [{}],
      [{ root: '/' }],
      [{ dir: 'some/dir' }],
      [{ base: 'index.html' }],
      [{ ext: '.png', name: 'x' }],
      [{ ext: '.html', name: 'index' }],
      [{ ext: '.html', name: 'index', root: '/' }],
      [{ dir: 'some/dir', ext: '.html', name: 'index' }],
      [{ base: '', dir: 'lib', ext: '.mjs', name: 'index', root: '' }]
    ]

    // Act + Expect
    cases.forEach(([pathObject]) => {
      expect(testSubject(pathObject)).to.equal(posix.format(pathObject))
    })
  })

  describe('windows', () => {
    it('should return path string from object', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [{}],
        [{ root: 'C:\\' }],
        [{ dir: 'some\\dir' }],
        [{ base: 'index.html' }],
        [{ ext: '.html', name: 'index' }],
        [{ ext: '.html', name: 'index', root: 'C:\\' }],
        [{ dir: 'some\\dir', ext: '.html', name: 'index' }]
      ]

      // Act + Expect
      cases.forEach(([object]) => {
        expect(testSubject(object)).to.equal(ensurePosix(win32.format(object)))
      })
    })
  })
})
