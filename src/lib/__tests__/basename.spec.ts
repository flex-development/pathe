/**
 * @file Unit Tests - basename
 * @module pathe/lib/tests/unit/basename
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-basename.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../basename'
import toPosix from '../to-posix'

describe('unit:lib/basename', () => {
  describe('posix', () => {
    it.each<[string]>([
      [''],
      ['//a'],
      ['/a/b'],
      ['/aaa/'],
      ['/aaa/b'],
      ['/aaa/bbb'],
      ['/basename.ext'],
      ['/dir/basename.ext'],
      ['basename.ext'],
      ['basename.ext/'],
      ['basename.ext//']
    ])('should return last portion of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(posix.basename(path))
    })

    it.each<[string, string]>([
      ['.js', '.js'],
      ['/aaa/bbb', '/bbb'],
      ['/aaa/bbb', 'a/bbb'],
      ['/aaa/bbb', 'b'],
      ['/aaa/bbb', 'bb'],
      ['/aaa/bbb', 'bbb'],
      ['/aaa/bbb//', 'bbb'],
      ['/test-path-basename.js', '.js'],
      ['a', 'a'],
      ['aaa/bbb', '/bbb'],
      ['aaa/bbb', 'a/bbb'],
      ['aaa/bbb', 'b'],
      ['aaa/bbb', 'bb'],
      ['aaa/bbb', 'bbb'],
      ['aaa/bbb//', 'bbb'],
      ['file', '.js'],
      ['file.js', '.ts'],
      ['file.js.old', '.js.old'],
      ['js', '.js']
    ])('should return last portion of `path` without `suffix` (%j, %j)', (
      path,
      suffix
    ) => {
      expect(testSubject(path, suffix)).to.eq(posix.basename(path, suffix))
    })
  })

  describe('windows', () => {
    it.each<[string]>([
      [''],
      ['//a'],
      ['/a/b'],
      ['/aaa/'],
      ['/aaa/b'],
      ['/aaa/bbb'],
      ['/basename.ext'],
      ['/dir/basename.ext'],
      ['/test-path-basename.js'],
      ['C:'],
      ['C:.'],
      ['C:\\'],
      ['C:\\basename.ext'],
      ['C:\\dir\\base.ext'],
      ['C:basename.ext'],
      ['C:basename.ext\\'],
      ['C:basename.ext\\\\'],
      ['C:foo'],
      ['\\basename.ext'],
      ['\\dir\\basename.ext'],
      ['basename.ext'],
      ['basename.ext'],
      ['basename.ext/'],
      ['basename.ext//'],
      ['basename.ext\\'],
      ['basename.ext\\\\'],
      ['file:stream'],
      ['foo']
    ])('should return last portion of `path` (%j)', path => {
      expect(testSubject(path)).to.eq(toPosix(win32.basename(path)))
    })

    it.each<[string, string]>([
      ['.js', '.js'],
      ['/aaa/bbb', '/bbb'],
      ['/aaa/bbb', 'a/bbb'],
      ['/aaa/bbb', 'b'],
      ['/aaa/bbb', 'bb'],
      ['/aaa/bbb', 'bbb'],
      ['/aaa/bbb//', 'bbb'],
      ['/test-path-basename.js', '.js'],
      ['aaa/bbb', '/bbb'],
      ['aaa/bbb', 'a/bbb'],
      ['aaa/bbb', 'b'],
      ['aaa/bbb', 'bb'],
      ['aaa/bbb', 'bbb'],
      ['aaa/bbb//', 'bbb'],
      ['aaa\\bbb', '\\bbb'],
      ['aaa\\bbb', 'a\\bbb'],
      ['aaa\\bbb', 'b'],
      ['aaa\\bbb', 'bb'],
      ['aaa\\bbb', 'bbb'],
      ['aaa\\bbb\\\\\\\\', 'bbb'],
      ['file', '.js'],
      ['file.js', '.ts'],
      ['file.js.old', '.js.old'],
      ['js', '.js']
    ])('should return last portion of `path` without `suffix` (%j, %j)', (
      path,
      suffix
    ) => {
      // Act
      const result = testSubject(path, suffix)

      // Expect
      expect(result).to.eq(toPosix(win32.basename(path, suffix)))
    })
  })
})
