/**
 * @file Unit Tests - isAbsolute
 * @module pathe/lib/tests/unit/isAbsolute
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-isabsolute.js
 */

import testSubject from '#lib/is-absolute'
import toPath from '#lib/to-path'
import { posix, win32 } from 'node:path'

describe('unit:lib/isAbsolute', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['./baz'],
      ['bar/'],
      [new URL('node:path')]
    ])('should return `false` if `input` is not absolute (%j)', input => {
      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.be.false.and.eq(posix.isAbsolute(toPath(input)))
    })

    it.each<Parameters<typeof testSubject>>([
      ['/home/foo'],
      ['/home/foo/..'],
      [new URL('file:///.npmrc')]
    ])('should return `true` if `input` is absolute (%j)', input => {
      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.be.true.and.eq(posix.isAbsolute(toPath(input)))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['./baz'],
      ['C:cwd/another'],
      ['C:cwd\\another'],
      ['bar/'],
      ['c'],
      ['c:'],
      ['directory/directory'],
      ['directory\\directory']
    ])('should return `false` if `input` is not absolute (%j)', input => {
      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.be.false.and.eq(win32.isAbsolute(toPath(input)))
    })

    it.each<Parameters<typeof testSubject>>([
      ['/'],
      ['//'],
      ['//server'],
      ['//server/file'],
      ['/home/foo'],
      ['/home/foo/..'],
      ['C:/Users/'],
      ['C:\\Users\\'],
      ['\\\\'],
      ['\\\\server'],
      ['\\\\server\\file'],
      ['c:/'],
      ['c://'],
      ['c:\\']
    ])('should return `true` if `input` is absolute (%j)', input => {
      // Act
      const result = testSubject(input)

      // Expect
      expect(result).to.be.true.and.eq(win32.isAbsolute(toPath(input)))
    })
  })
})
