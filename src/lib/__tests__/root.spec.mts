/**
 * @file Unit Tests - root
 * @module pathe/lib/tests/unit/root
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-parse-format.js
 */

import DRIVE from '#fixtures/drive'
import dot from '#lib/dot'
import testSubject from '#lib/root'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/root', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
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
      ['file:'],
      [new URL('file:///home/user/dir/file.txt')],
      ['user/dir/another file.zip'],
      [posix.sep + dot],
      [posix.sep.repeat(2)],
      [posix.sep.repeat(3)],
      [posix.sep]
    ])('should return root of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.parse(toPath(input)).root)
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      ['\\\\?\\UNC'],
      ['\\\\?\\UNC\\server\\share'],
      ['\\\\server two\\shared folder\\file path.zip'],
      ['\\\\server\\share\\file_path'],
      ['\\\\user\\admin$\\system32'],
      ['\\foo\\C:'],
      ['another_path\\DIR with spaces\\1\\2\\33\\index'],
      [DRIVE + '\\abc'],
      [DRIVE + '\\another_path\\DIR\\1\\2\\33\\\\index'],
      [DRIVE + '\\path\\dir\\index.html'],
      [DRIVE + dot.repeat(2)],
      [DRIVE + dot],
      [DRIVE + win32.sep],
      [DRIVE],
      [dot + '\\file'],
      [win32.sep]
    ])('should return root `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.parse(toPath(input)).root))
    })
  })
})
