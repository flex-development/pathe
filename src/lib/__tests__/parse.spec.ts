/**
 * @file Unit Tests - parse
 * @module pathe/lib/tests/unit/parse
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-parse-format.js
 * @see https://github.com/nodejs/node/issues/18655
 */

import type { ParsedPath } from '#src/interfaces'
import sep from '#src/lib/sep'
import { posix, win32 } from 'node:path'
import testSubject from '../parse'

describe('unit:lib/parse', () => {
  it('should return parsed path object', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      ['/.'],
      ['/.foo'],
      ['/.foo.bar'],
      ['/foo'],
      ['/foo.'],
      ['/foo.bar'],
      ['/foo///'],
      ['/foo///bar.baz'],
      ['/foo/bar.baz'],
      ['/home/user/a dir//another&file.'],
      ['/home/user/a dir/another file.zip'],
      ['/home/user/a$$$dir//another file.zip'],
      ['/home/user/dir/file.txt'],
      ['/home/user/dir/file.txt'],
      ['user/dir/another file.zip'],
      [posix.sep],
      [posix.sep.repeat(2)],
      [posix.sep.repeat(3)]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.deep.equal(posix.parse(path))
    })
  })

  describe('windows', () => {
    /**
     * Converts Windows-style path separators (`\`) to POSIX (`/`).
     *
     * @param {ParsedPath} parsed - Parsed path object to normalize
     * @return {string} `parsed` with values normalized
     */
    const ensurePosix = (parsed: ParsedPath): ParsedPath => {
      for (const [key, value] of Object.entries<string>(parsed)) {
        if (!value) continue
        parsed[key] = value.replace(/\\/g, sep)
      }

      return parsed
    }

    it('should return parsed path object', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [''],
        ['.\\file'],
        ['C:'],
        ['C:.'],
        ['C:..'],
        ['C:\\'],
        ['C:\\abc'],
        ['C:\\another_path\\DIR\\1\\2\\33\\\\index'],
        ['C:\\path\\dir\\index.html'],
        ['C:abc'],
        ['\\\\?\\UNC\\server\\share'],
        ['\\\\server two\\shared folder\\file path.zip'],
        ['\\\\server\\share\\file_path'],
        ['\\\\user\\admin$\\system32'],
        ['\\foo\\C:'],
        ['another_path\\DIR with spaces\\1\\2\\33\\index'],
        [win32.sep]
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.deep.equal(ensurePosix(win32.parse(path)))
      })
    })
  })
})
