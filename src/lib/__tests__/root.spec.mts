/**
 * @file Unit Tests - root
 * @module pathe/lib/tests/unit/root
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-parse-format.js
 */

import DEVICE_ROOT from '#fixtures/device-root'
import DRIVE from '#fixtures/drive'
import dot from '#lib/dot'
import pathToFileURL from '#lib/path-to-file-url'
import testSubject from '#lib/root'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/root', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['/'],
      ['/.'],
      ['/.foo'],
      ['/.foo.bar'],
      ['//'],
      ['///'],
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
      ['x']
    ])('should return root of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.parse(String(input)).root)
    })

    it.each<[...Parameters<typeof testSubject>, string?]>([
      ['file:'],
      ['file:' + posix.sep],
      ['file:' + posix.sep.repeat(2)],
      ['file:' + posix.sep.repeat(3)],
      [
        'file:///home/user/dir/file.txt',
        pathToFileURL(posix.sep, { string: true })
      ],
      [
        'https://github.com/flex-development/pathe/blob/main/src/index.mts',
        'https://github.com'
      ]
    ])('should return root of `input` url (%j)', (input, expected) => {
      expect(testSubject(input)).to.eq(expected ?? input)
    })
  })

  describe('windows', () => {
    let windows: true

    beforeAll(() => {
      windows = true
    })

    it.each<Parameters<typeof testSubject>>([
      ['\\\\?\\UNC'],
      ['\\\\?\\UNC\\server\\share'],
      ['\\\\server two\\shared folder\\file path.zip'],
      ['\\\\server\\share\\file_path'],
      ['\\\\user\\admin$\\system32'],
      ['\\foo\\' + DRIVE],
      ['another_path\\DIR with spaces\\1\\2\\33\\index'],
      [DEVICE_ROOT + 'abc'],
      [DEVICE_ROOT + 'another_path\\DIR\\1\\2\\33\\\\index'],
      [DEVICE_ROOT + 'path\\dir\\index.html'],
      [DRIVE + dot.repeat(2)],
      [DRIVE + dot],
      [DEVICE_ROOT],
      [DRIVE],
      [dot + win32.sep + 'file'],
      [win32.sep]
    ])('should return root `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.parse(String(input)).root))
    })

    it.each<Parameters<typeof testSubject>>([
      ['file:' + win32.sep.repeat(3) + DEVICE_ROOT],
      ['file:' + win32.sep.repeat(3) + DEVICE_ROOT + 'test\\root.spec.mts'],
      [new URL('file://host/share/dir/file.txt')]
    ])('should return root of `input` url (%j)', input => {
      // Arrange
      const path: string = toPath(input, { windows })
      const root: string = toPosix(win32.parse(path).root)
      const expected: string = pathToFileURL(root, { string: true, windows })

      // Act + Expect
      expect(testSubject(input)).to.eq(expected)
    })
  })
})
