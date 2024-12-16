/**
 * @file Unit Tests - parse
 * @module pathe/lib/tests/unit/parse
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-parse-format.js
 */

import DEVICE_ROOT from '#fixtures/device-root'
import DRIVE from '#fixtures/drive'
import dirname from '#lib/dirname'
import dot from '#lib/dot'
import testSubject from '#lib/parse'
import root from '#lib/root'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import { posix, win32, type ParsedPath } from 'node:path'

describe('unit:lib/parse', () => {
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
    ])('should return significant elements of `input` (%j)', input => {
      expect(testSubject(input)).to.eql(posix.parse(toPath(input)))
    })

    it.each<Parameters<typeof testSubject>>([
      ['file:'],
      ['file:' + posix.sep],
      ['file:' + posix.sep.repeat(2)],
      ['file:' + posix.sep.repeat(3)],
      ['file:///home/user/dir/file.txt'],
      ['https://github.com/flex-development/pathe/blob/main/src/index.mts']
    ])('should return significant elements of `input` url (%j)', input => {
      // Arrange
      const expected: ParsedPath = posix.parse(String(toPath(input)))

      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.have.keys(...Object.keys(expected))
      expect(result).to.have.property('base', expected.base)
      expect(result).to.have.property('dir', dirname(input))
      expect(result).to.have.property('ext', expected.ext)
      expect(result).to.have.property('name', expected.name)
      expect(result).to.have.property('root', root(input))
    })
  })

  describe('windows', () => {
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
      [DRIVE + 'abc'],
      [DRIVE + dot.repeat(2)],
      [DRIVE + dot],
      [DRIVE + win32.sep],
      [DRIVE],
      [dot + win32.sep + 'file'],
      [win32.sep]
    ])('should return significant elements of `input` (%j)', input => {
      expect(testSubject(input)).to.eql(win32.parse(toPosix(toPath(input))))
    })

    it.each<Parameters<typeof testSubject>>([
      ['file:' + win32.sep.repeat(3) + DEVICE_ROOT],
      ['file:' + win32.sep.repeat(3) + DEVICE_ROOT + 'test\\root.spec.mts'],
      [new URL('file://host/share/dir/file.txt')]
    ])('should return significant elements of `input` url (%j)', input => {
      // Arrange
      const path: string = String(toPath(input, { windows: true }))
      const expected: ParsedPath = win32.parse(path)

      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.have.keys(...Object.keys(expected))
      expect(result).to.have.property('base', expected.base)
      expect(result).to.have.property('dir', dirname(input))
      expect(result).to.have.property('ext', expected.ext)
      expect(result).to.have.property('name', expected.name)
      expect(result).to.have.property('root', root(input))
    })
  })
})
