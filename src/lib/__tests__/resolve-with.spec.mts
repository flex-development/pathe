/**
 * @file Unit Tests - resolveWith
 * @module pathe/lib/tests/unit/resolveWith
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-resolve.js
 */

import DRIVE from '#fixtures/drive'
import process from '#internal/process'
import dot from '#lib/dot'
import testSubject from '#lib/resolve-with'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'
import { ok } from 'devlop'
import { posix, win32 } from 'node:path'

describe('unit:lib/resolveWith', () => {
  it('should return "." on `cwd()` failure', () => {
    // Arrange
    vi.spyOn(process, 'cwd').mockImplementation(() => '')

    // Act + Expect
    expect(testSubject([], process))
      .to.eq(posix.resolve())
      .and.eq(win32.resolve())
      .and.eq(dot)
  })

  describe('posix', () => {
    it.each<string[]>([
      [''],
      ['package.json'],
      ['', ''],
      ['/foo/bar', './baz', ''],
      ['/foo/bar', './baz'],
      ['/foo/bar', '/tmp/file/'],
      ['/foo/bar', dot.repeat(2), dot, './baz'],
      ['/foo/tmp.3/', '../tmp.3/cycles/root.js'],
      ['/some/dir', dot, '/absolute/'],
      ['/var/lib', '../', 'file/'],
      ['/var/lib', '/../', 'file/'],
      ['a/b/c/', '../../..'],
      [posix.sep, '', '', '/path'],
      [posix.sep, '/path'],
      [dot],
      [posix.sep]
    ])('should return absolute path (%#)', (...paths) => {
      expect(testSubject(paths)).to.eq(posix.resolve(...paths))
    })
  })

  describe('windows', () => {
    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it.each<string[]>([
      ['C:'],
      ['C:\\'],
      ['C:\\Windows\\long\\path/mixed', '../..', '..\\..\\reports'],
      ['C:\\Windows\\path\\only', '..\\..\\reports'],
      ['C:\\foo\\bar', '.\\baz'],
      ['C:\\foo\\tmp.3\\', '..\\tmp.3\\cycles\\root.js'],
      ['T:\\foo\\tmp.3\\', '..\\tmp.3\\cycles\\root.js'],
      ['\\\\.\\PHYSICALDRIVE0'],
      ['\\\\?\\PHYSICALDRIVE0'],
      ['\\\\host\\share\\dir\\file.txt'],
      ['\\\\server\\share', '..', 'relative\\'],
      ['\\foo\\bar', '', '\\tmp\\file\\'],
      ['\\foo\\bar', '.\\baz'],
      ['\\foo\\bar', '\\tmp\\file\\'],
      ['\\foo\\bar', dot.repeat(2), dot, '.\\baz'],
      ['c:'],
      ['c:/', '//'],
      ['c:/', '///some//dir'],
      ['c:/', '//dir'],
      ['c:/', '//server//share'],
      ['c:/', '//server/share'],
      ['c:/blah\\blah', 'd:/games', 'c:../a'],
      ['c:/ignore', 'c:/some/file'],
      ['c:/ignore', 'd:\\a/b\\c/d', '\\e.exe'],
      ['d:/ignore', 'd:some/dir//'],
      ['foo', '\\\\host\\share\\dir\\file.txt'],
      ['package.json'],
      ['t:'],
      ['t:/', '//'],
      ['t:/', '///some//dir'],
      ['t:/', '//dir'],
      ['t:/', '//server//share'],
      ['t:/', '//server/share'],
      ['t:/'],
      ['t:/blah\\blah', 'd:/games', 't:../a'],
      ['t:/ignore', 'c:/some/file'],
      ['t:/ignore', 'd:\\a/b\\c/d', '\\e.exe'],
      [dot]
    ])('should return absolute path (%#)', (...paths) => {
      // Arrange
      ok(process.cwd().startsWith(DRIVE), 'expected cwd to start with `DRIVE`')

      // Act + Expect
      expect(testSubject(paths)).to.eq(toPosix(win32.resolve(...paths)))
    })
  })
})
