/**
 * @file Unit Tests - extname
 * @module pathe/lib/tests/unit/extname
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-extname.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../extname'

describe('unit:lib/extname', () => {
  it('should return extension name of path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      ['.'],
      ['..'],
      ['...'],
      ['....'],
      ['...ext'],
      ['../'],
      ['..file'],
      ['..file.'],
      ['..file..'],
      ['..file.ext'],
      ['./'],
      ['.file'],
      ['.file'],
      ['.file.'],
      ['.file..'],
      ['.file.ext'],
      ['.file.ext'],
      ['.path/file.ext'],
      ['/.file'],
      ['/.file.ext'],
      ['/file'],
      ['/file.ext'],
      ['/path.to/.file'],
      ['/path.to/.file.ext'],
      ['/path.to/file'],
      ['/path.to/file.ext'],
      ['/path/to/..'],
      ['/path/to/..ext'],
      ['/path/to/f.ext'],
      ['/path/to/file'],
      ['/path/to/file.ext'],
      ['file'],
      ['file.'],
      ['file./'],
      ['file.//'],
      ['file.ext'],
      ['file.ext.ext'],
      ['file.ext/'],
      ['file.ext//'],
      ['file/'],
      ['file//'],
      [import.meta.url]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.extname(path))
    })
  })

  describe('windows', () => {
    it('should return extension name of path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [''],
        ['.'],
        ['..'],
        ['...'],
        ['....'],
        ['...ext'],
        ['..\\'],
        ['..\\'],
        ['..file'],
        ['..file.'],
        ['..file..'],
        ['..file.ext'],
        ['.\\'],
        ['.\\'],
        ['.file'],
        ['.file'],
        ['.file.'],
        ['.file..'],
        ['.file.ext'],
        ['.file.ext'],
        ['.path\\file.ext'],
        ['\\.file'],
        ['\\.file.ext'],
        ['\\file'],
        ['\\file.ext'],
        ['\\path.to\\.file'],
        ['\\path.to\\.file.ext'],
        ['\\path.to\\file'],
        ['\\path.to\\file.ext'],
        ['\\path\\to\\..'],
        ['\\path\\to\\..ext'],
        ['\\path\\to\\f.ext'],
        ['\\path\\to\\file'],
        ['\\path\\to\\file.ext'],
        ['c:\\path.to\\.file'],
        ['c:\\path.to\\.file.ext'],
        ['c:\\path.to\\file'],
        ['c:\\path.to\\file.ext'],
        ['c:\\path\\to\\..'],
        ['c:\\path\\to\\..ext'],
        ['c:\\path\\to\\f.ext'],
        ['c:\\path\\to\\file'],
        ['c:\\path\\to\\file.ext'],
        ['file'],
        ['file.'],
        ['file.\\'],
        ['file.\\'],
        ['file.\\\\'],
        ['file.\\\\'],
        ['file.ext'],
        ['file.ext.ext'],
        ['file.ext\\'],
        ['file.ext\\'],
        ['file.ext\\\\'],
        ['file.ext\\\\'],
        ['file\\'],
        ['file\\'],
        ['file\\\\'],
        ['file\\\\'],
        [import.meta.url]
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.equal(win32.extname(path))
      })
    })
  })
})
