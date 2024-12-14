/**
 * @file Unit Tests - basename
 * @module pathe/lib/tests/unit/basename
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-basename.js
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
      ['/node/blob/v23.4.0/test/parallel/test-path-basename.js'],
      ['basename.ext'],
      ['basename.ext/'],
      ['basename.ext//']
    ])('should return last portion of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.basename(String(input)))
    })

    it.each<[Parameters<typeof testSubject>[0]]>([
      ['file:'],
      ['file:////a'],
      ['file:///a/b'],
      ['file:///aaa/'],
      ['file:///aaa/b'],
      ['file:///aaa/bbb'],
      ['file:///basename.ext'],
      ['file:///dir/basename.ext'],
      ['https://github.com/flex-development/pathe/blob/main/src/index.mts'],
      ['node:test'],
      ['node:test/reporters']
    ])('should return last portion of `input` url (%j)', input => {
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
      ['/node/blob/v23.4.0/test/parallel/test-path-basename.js', '.js'],
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
      expect(result).to.eq(posix.basename(String(input), suffix!))
    })
  })

  describe('windows', () => {
    it.each<[Parameters<typeof testSubject>[0]]>([
      ['\\basename.ext'],
      ['\\dir\\basename.ext'],
      ['C:'],
      ['C:.'],
      ['C:\\'],
      ['C:\\basename.ext'],
      ['C:\\dir\\base.ext'],
      ['C:basename.ext'],
      ['C:basename.ext\\'],
      ['C:basename.ext\\\\'],
      ['C:foo'],
      ['a'],
      ['basename.ext\\'],
      ['basename.ext\\\\']
    ])('should return last portion of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.basename(String(input))))
    })

    it.each<[Parameters<typeof testSubject>[0]]>([
      ['file:\\\\\\basename.ext'],
      ['file:\\\\\\dir\\basename.ext'],
      ['file:\\\\\\a'],
      ['file:\\\\\\basename.ext\\'],
      ['file:\\\\\\basename.ext\\\\'],
      ['file:\\\\\\c:'],
      ['file:\\\\\\c:.'],
      ['file:\\\\\\c:\\'],
      ['file:\\\\\\c:\\basename.ext'],
      ['file:\\\\\\c:\\dir\\base.ext'],
      ['file:\\\\\\c:basename.ext'],
      ['file:\\\\\\c:basename.ext\\'],
      ['file:\\\\\\c:basename.ext\\\\'],
      ['file:\\\\\\c:foo'],
      ['file:\\\\\\foo']
    ])('should return last portion of `input` url (%j)', input => {
      // Arrange
      const path: string = String(input).replace('file:\\\\\\', '')

      // Act + Expect
      expect(testSubject(input)).to.eq(toPosix(win32.basename(path)))
    })

    it.each<Parameters<typeof testSubject>>([
      ['aaa\\bbb', '\\bbb'],
      ['aaa\\bbb', 'a\\bbb'],
      ['aaa\\bbb', 'b'],
      ['aaa\\bbb', 'bb'],
      ['aaa\\bbb', 'bbb'],
      ['aaa\\bbb\\\\\\\\', 'bbb']
    ])('should return last portion of `input` without `suffix` (%j, %j)', (
      input,
      suffix
    ) => {
      // Act
      const result = testSubject(input, suffix)

      // Expect
      expect(result).to.eq(toPosix(win32.basename(String(input), suffix!)))
    })
  })
})
