/**
 * @file Unit Tests - root
 * @module pathe/lib/tests/unit/root
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-parse-format.js
 */

import dot from '#lib/dot'
import testSubject from '#lib/root'
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
      ['user/dir/another file.zip'],
      [posix.sep + dot],
      [posix.sep.repeat(2)],
      [posix.sep.repeat(3)],
      [posix.sep]
    ])('should return root of `path` (%j)', path => {
      expect(testSubject(path)).to.eql(posix.parse(path).root)
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      ['C:' + dot.repeat(2)],
      ['C:' + dot],
      ['C:' + win32.sep],
      ['C:'],
      ['C:\\abc'],
      ['C:\\another_path\\DIR\\1\\2\\33\\\\index'],
      ['C:\\path\\dir\\index.html'],
      ['C:abc'],
      ['\\\\?\\UNC'],
      ['\\\\?\\UNC\\server\\share'],
      ['\\\\server two\\shared folder\\file path.zip'],
      ['\\\\server\\share\\file_path'],
      ['\\\\user\\admin$\\system32'],
      ['\\foo\\C:'],
      ['another_path\\DIR with spaces\\1\\2\\33\\index'],
      [dot + '\\file'],
      [win32.sep]
    ])('should return root `path` (%j)', path => {
      expect(testSubject(path)).to.eql(toPosix(win32.parse(path).root))
    })
  })
})
