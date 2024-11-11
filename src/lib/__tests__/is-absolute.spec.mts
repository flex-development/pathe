/**
 * @file Unit Tests - isAbsolute
 * @module pathe/lib/tests/unit/isAbsolute
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-isabsolute.js
 */

import testSubject from '#lib/is-absolute'
import { posix, win32 } from 'node:path'

describe('unit:lib/isAbsolute', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['./baz'],
      ['bar/']
    ])('should return `false` if `path` is not absolute (%j)', path => {
      expect(testSubject(path)).to.be.false.and.eq(posix.isAbsolute(path))
    })

    it.each<Parameters<typeof testSubject>>([
      ['/home/foo'],
      ['/home/foo/..']
    ])('should return `true` if `path` is absolute (%j)', path => {
      expect(testSubject(path)).to.be.true.and.eq(posix.isAbsolute(path))
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
    ])('should return `false` if `path` is not absolute (%j)', path => {
      expect(testSubject(path)).to.be.false.and.eq(win32.isAbsolute(path))
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
    ])('should return `true` if `path` is absolute (%j)', path => {
      expect(testSubject(path)).to.be.true.and.eq(win32.isAbsolute(path))
    })
  })
})
