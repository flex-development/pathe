/**
 * @file Unit Tests - extname
 * @module pathe/lib/tests/unit/extname
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-extname.js
 */

import testSubject from '#lib/extname'
import toPath from '#lib/to-path'
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
      ['file//'],
      [new URL(import.meta.url)]
    ])('should return extension of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.extname(toPath(input)))
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
      ['file\\\\'],
      [import.meta.url.replaceAll(posix.sep, win32.sep)]
    ])('should return extension of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.extname(toPath(input))))
    })
  })
})
