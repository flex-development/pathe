/**
 * @file Unit Tests - resolveWith
 * @module pathe/lib/tests/unit/resolveWith
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-resolve.js
 */

import { posix, win32 } from 'node:path'
import dot from '../dot'
import testSubject from '../resolve-with'
import toPosix from '../to-posix'

describe('unit:lib/resolveWith', () => {
  it('should return "." on `cwd()` failure', () => {
    // Arrange
    process.cwd = () => ''
    assert.strictEqual(process.cwd(), '')

    // Act + Expect
    expect(testSubject([], process.cwd))
      .to.eq(posix.resolve())
      .and.eq(win32.resolve())
      .and.eq(dot)
  })

  describe('posix', () => {
    it.each<[Parameters<typeof testSubject>[0]]>([
      [''],
      ['package.json'],
      [['', '']],
      [['/foo/bar', './baz', '']],
      [['/foo/bar', './baz']],
      [['/foo/bar', '/tmp/file/']],
      [['/foo/bar', dot.repeat(2), dot, './baz']],
      [['/foo/tmp.3/', '../tmp.3/cycles/root.js']],
      [['/some/dir', dot, '/absolute/']],
      [['/var/lib', '../', 'file/']],
      [['/var/lib', '/../', 'file/']],
      [['a/b/c/', '../../..']],
      [[posix.sep, '', '', '/path']],
      [[posix.sep, '/path']],
      [dot],
      [posix.sep]
    ])('should return absolute path (%#)', paths => {
      // Act
      const result = testSubject(paths, process.cwd)

      // Expect
      expect(result).to.eq(posix.resolve(...[paths].flat()))
    })
  })

  describe('windows', () => {
    it.each<string[]>([
      [],
      ['', ''],
      [''],
      ['C:'],
      ['C:\\'],
      ['C:\\Windows\\long\\path/mixed', '../..', '..\\..\\reports'],
      ['C:\\Windows\\path\\only', '..\\..\\reports'],
      ['C:\\foo\\bar', '.\\baz'],
      ['C:\\foo\\tmp.3\\', '..\\tmp.3\\cycles\\root.js'],
      ['Q:'],
      ['Q:\\'],
      ['Z:'],
      ['Z:\\'],
      ['\\\\host\\share\\dir\\file.txt'],
      ['\\\\server\\share', '..', 'relative\\'],
      ['\\foo\\bar', '', '\\tmp\\file\\'],
      ['\\foo\\bar', '.\\baz'],
      ['\\foo\\bar', '\\tmp\\file\\'],
      ['\\foo\\bar', dot.repeat(2), dot, '.\\baz'],
      ['c:\\', '\\\\'],
      ['c:\\', '\\\\\\some\\\\dir'],
      ['c:\\', '\\\\dir'],
      ['c:\\', '\\\\server\\\\share'],
      ['c:\\', '\\\\server\\share'],
      ['c:\\blah\\blah', 'd:\\games', 'c:..\\a'],
      ['c:\\ignore', 'c:\\some\\file'],
      ['c:\\ignore', 'd:\\a\\b\\c\\d', '\\e.exe'],
      ['d:', 'file.txt'],
      ['d:\\ignore', 'd:some\\dir\\\\'],
      ['foo', '\\\\host\\share\\dir\\file.txt'],
      ['package.json'],
      [dot]
    ])('should return absolute path (%#)', (...paths) => {
      // Act
      const result = testSubject(paths, process.cwd, process.env)

      // Expect
      expect(result).to.eq(toPosix(win32.resolve(...paths)))
    })
  })
})
