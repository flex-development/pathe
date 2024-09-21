/**
 * @file Unit Tests - dirname
 * @module pathe/lib/tests/unit/dirname
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-dirname.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../dirname'
import toPosix from '../to-posix'

describe('unit:lib/dirname', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['//a'],
      ['/a'],
      ['/a/b'],
      ['/a/b/'],
      ['a'],
      ['foo'],
      [posix.sep.repeat(4)],
      [posix.sep]
    ])('should return directory name of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(posix.dirname(path))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['/a'],
      ['/a/b'],
      ['/a/b/'],
      ['\\\\unc\\share'],
      ['\\\\unc\\share\\foo'],
      ['\\\\unc\\share\\foo\\'],
      ['\\\\unc\\share\\foo\\bar'],
      ['\\\\unc\\share\\foo\\bar\\'],
      ['\\\\unc\\share\\foo\\bar\\baz'],
      ['\\foo bar\\baz'],
      ['\\foo'],
      ['\\foo\\'],
      ['\\foo\\bar'],
      ['\\foo\\bar\\'],
      ['\\foo\\bar\\baz'],
      ['a'],
      ['c:'],
      ['c:.'],
      ['c:\\'],
      ['c:\\foo bar\\baz'],
      ['c:\\foo'],
      ['c:\\foo\\'],
      ['c:\\foo\\bar'],
      ['c:\\foo\\bar\\'],
      ['c:\\foo\\bar\\baz'],
      ['c:foo bar\\baz'],
      ['c:foo'],
      ['c:foo\\'],
      ['c:foo\\bar'],
      ['c:foo\\bar\\'],
      ['c:foo\\bar\\baz'],
      ['dir\\file:stream'],
      ['file:stream'],
      ['foo'],
      [posix.sep.repeat(4)],
      [posix.sep],
      [win32.sep.repeat(2)],
      [win32.sep]
    ])('should return directory name of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(toPosix(win32.dirname(path)))
    })
  })
})
