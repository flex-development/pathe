/**
 * @file Unit Tests - resolve
 * @module pathe/lib/tests/unit/resolve
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-resolve.js
 */

import sep from '#src/lib/sep'
import { DOT, set } from '@flex-development/tutils'
import { posix, win32 } from 'node:path'
import testSubject from '../resolve'

describe('unit:lib/resolve', () => {
  it('should return "." on process.cwd() failure', () => {
    // Arrange
    process.cwd = () => ''
    assert.strictEqual(process.cwd(), '')

    // Act + Expect
    expect(testSubject()).to.equal(posix.resolve()).to.equal(DOT)
  })

  it('should return absolute path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [],
      [''],
      ['', ''],
      ['/foo/bar', './baz', ''],
      ['/foo/bar', './baz'],
      ['/foo/bar', '/tmp/file/'],
      ['/foo/bar', DOT.repeat(2), DOT, './baz'],
      ['/foo/tmp.3/', '../tmp.3/cycles/root.js'],
      ['/some/dir', DOT, '/absolute/'],
      ['/var/lib', '../', 'file/'],
      ['/var/lib', '/../', 'file/'],
      ['a/b/c/', '../../..'],
      ['package.json'],
      [DOT],
      [import.meta.url],
      [posix.sep],
      [posix.sep, '/path'],
      [posix.sep, '', '', '/path']
    ]

    // Act + Expect
    cases.forEach(paths => {
      expect(testSubject(...paths)).to.equal(posix.resolve(...paths))
    })
  })

  describe('windows', () => {
    beforeAll(() => {
      set(process.env, '=Q:', 'Q:' + process.cwd())
      set(process.env, '=Z:', 'A:' + process.cwd())
    })

    /**
     * Converts Windows-style path separators (`\`) to POSIX (`/`).
     *
     * @param {string} path - Path to normalize
     * @return {string} `path` normalized
     */
    const ensurePosix = (path: string): string => path.replace(/\\/g, sep)

    it('should return "." on process.cwd() failure', () => {
      // Arrange
      process.cwd = () => ''
      assert.strictEqual(process.cwd(), '')

      // Act + Expect
      expect(testSubject()).to.equal(win32.resolve()).to.equal(DOT)
    })

    it('should return absolute path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [],
        [''],
        ['', ''],
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
        ['\\foo\\bar', DOT.repeat(2), DOT, '.\\baz'],
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
        [DOT],
        [import.meta.url]
      ]

      // Act + Expect
      cases.forEach(p => {
        expect(testSubject(...p)).to.equal(ensurePosix(win32.resolve(...p)))
      })
    })
  })
})
