/**
 * @file Unit Tests - join
 * @module pathe/lib/tests/unit/join
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-join.js
 */

import dot from '#lib/dot'
import testSubject from '#lib/join'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/join', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [],
      [''],
      ['', ''],
      ['', '', 'foo'],
      ['', '', '/foo'],
      ['', '..', '..', '/foo'],
      ['', '/foo'],
      ['', 'foo'],
      ['', dot],
      ['', posix.sep, '/foo'],
      ['', posix.sep, 'foo'],
      [' ', ''],
      [' ', 'foo'],
      [' ', dot],
      [' ', posix.sep],
      [' /foo'],
      ['./', '..', '..', '/foo'],
      ['./', '..', '/foo'],
      ['./'],
      ['/.', 'x/b', '..', '/b/c.js'],
      ['/foo', '../../../bar'],
      ['foo', '', '/bar'],
      ['foo', ''],
      ['foo', '../../../bar'],
      ['foo', '/bar'],
      ['foo/', ''],
      ['foo/', '../../../bar'],
      ['foo/x', '../../../bar'],
      ['foo/x', './bar'],
      ['foo/x/', './bar'],
      ['foo/x/', dot, 'bar'],
      [dot, '..', '..', '/foo'],
      [dot, './', dot],
      [dot, './'],
      [dot, '/./', dot],
      [dot, '/////./', dot],
      [dot, 'x/b', '..', '/b/c.js'],
      [dot, dot, dot],
      [dot],
      [posix.sep, '', '/foo'],
      [posix.sep, '..', '..'],
      [posix.sep, '..'],
      [posix.sep, '//foo'],
      [posix.sep, '/foo'],
      [posix.sep, 'foo'],
      [posix.sep, dot],
      [posix.sep]
    ])('should return `paths` as string (%#)', (...paths) => {
      expect(testSubject(...paths)).to.eq(posix.join(...paths))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [],
      [' ', ''],
      [' ', 'foo'],
      [' ', dot],
      [' ', posix.sep],
      [' /foo'],
      ['', '', '/foo'],
      ['', '', 'foo'],
      ['', ''],
      ['', '..', '..', '/foo'],
      ['', '//foo', 'bar'],
      ['', '//foo/', '/bar'],
      ['', '//foo/', 'bar'],
      ['', '/foo'],
      ['', 'c:'],
      ['', 'foo'],
      ['', dot],
      ['', posix.sep, '/foo'],
      ['', posix.sep, '/foo/bar'],
      ['', posix.sep, 'foo'],
      [''],
      ['./', '..', '..', '/foo'],
      ['./', '..', '/foo'],
      ['./'],
      ['/.', 'x/b', '..', '/b/c.js'],
      ['//', '/foo/bar'],
      ['//', 'foo/bar'],
      ['//'],
      ['////foo', 'bar'],
      ['///foo/bar'],
      ['//foo', '', 'bar'],
      ['//foo', '', posix.sep],
      ['//foo', '/bar'],
      ['//foo', 'bar'],
      ['//foo', posix.sep],
      ['//foo'],
      ['//foo/', '', '/bar'],
      ['//foo/', '', 'bar'],
      ['//foo/', 'bar'],
      ['//foo/'],
      ['//foo/bar'],
      ['/foo', '../../../bar'],
      ['\\/foo/bar'],
      ['\\\\\\/foo/bar'],
      ['\\\\foo/bar'],
      ['\\\\server', 'share'],
      ['c:', ''],
      ['c:', 'file'],
      ['c:', posix.sep],
      ['c:'],
      ['c:.', 'file'],
      ['c:.', posix.sep],
      ['c:.'],
      ['foo', '', '/bar'],
      ['foo', ''],
      ['foo', '../../../bar'],
      ['foo', '/bar'],
      ['foo/', ''],
      ['foo/', '../../../bar'],
      ['foo/x', '../../../bar'],
      ['foo/x', './bar'],
      ['foo/x/', './bar'],
      ['foo/x/', dot, 'bar'],
      [dot, '..', '..', '/foo'],
      [dot, './', dot],
      [dot, './'],
      [dot, '/./', dot],
      [dot, '/////./', dot],
      [dot, 'x/b', '..', '/b/c.js'],
      [dot, dot, dot],
      [dot],
      [posix.sep, '', '/foo'],
      [posix.sep, '..', '..'],
      [posix.sep, '..'],
      [posix.sep, '//foo'],
      [posix.sep, '/foo'],
      [posix.sep, 'foo'],
      [posix.sep, dot],
      [posix.sep],
      [win32.sep, '/foo/bar'],
      [win32.sep, 'foo/bar'],
      [win32.sep.repeat(2), posix.sep, '/foo/bar']
    ])('should return `paths` as string (%#)', (...paths) => {
      expect(testSubject(...paths)).to.eq(toPosix(win32.join(...paths)))
    })
  })
})
