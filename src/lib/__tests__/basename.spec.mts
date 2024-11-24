/**
 * @file Unit Tests - basename
 * @module pathe/lib/tests/unit/basename
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-basename.js
 */

import testSubject from '#lib/basename'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import { posix, win32 } from 'node:path'

describe('unit:lib/basename', () => {
  describe('posix', () => {
    it.each<[Parameters<typeof testSubject>[0]]>([
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
      ['basename.ext//'],
      [new URL('file:///test-path-basename.js')]
    ])('should return last portion of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.basename(toPath(input)))
    })

    it.each<Parameters<typeof testSubject>>([
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
    ])('should return last portion of `input` without `suffix` (%j, %j)', (
      input,
      suffix
    ) => {
      // Act
      const result = testSubject(input, suffix)

      // Expect
      expect(result).to.eq(posix.basename(toPath(input), suffix!))
    })
  })

  describe('windows', () => {
    it.each<[Parameters<typeof testSubject>[0]]>([
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
      ['foo'],
      ['node:test/reporters']
    ])('should return last portion of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.basename(toPath(input))))
    })

    it.each<Parameters<typeof testSubject>>([
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
    ])('should return last portion of `input` without `suffix` (%j, %j)', (
      input,
      suffix
    ) => {
      // Act
      const result = testSubject(input, suffix)

      // Expect
      expect(result).to.eq(toPosix(win32.basename(toPath(input), suffix!)))
    })
  })
})
