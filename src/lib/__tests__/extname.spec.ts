/**
 * @file Unit Tests - extname
 * @module pathe/lib/tests/unit/extname
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-extname.js
 */

import testSubject from '#lib/extname'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/extname', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
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
      ['/test-path-extname.js'],
      ['file'],
      ['file.'],
      ['file./'],
      ['file.//'],
      ['file.ext'],
      ['file.ext.ext'],
      ['file.ext/'],
      ['file.ext//'],
      ['file/'],
      ['file//']
    ])('should return extension of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(posix.extname(path))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['.'],
      ['..'],
      ['...'],
      ['....'],
      ['...ext'],
      ['../'],
      ['..\\'],
      ['..file'],
      ['..file.'],
      ['..file..'],
      ['..file.ext'],
      ['./'],
      ['.\\'],
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
      ['/test-path-extname.js'],
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
      ['file./'],
      ['file.//'],
      ['file.\\'],
      ['file.\\\\'],
      ['file.ext'],
      ['file.ext.ext'],
      ['file.ext/'],
      ['file.ext//'],
      ['file.ext\\'],
      ['file.ext\\\\'],
      ['file/'],
      ['file//'],
      ['file\\'],
      ['file\\\\']
    ])('should return extension of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(toPosix(win32.extname(path)))
    })
  })
})
