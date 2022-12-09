/**
 * @file Unit Tests - isAbsolute
 * @module pathe/lib/tests/unit/isAbsolute
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-isabsolute.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../is-absolute'

describe('unit:lib/isAbsolute', () => {
  it('should return false if path is not absolute', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [[''], ['./baz'], ['bar/']]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.isAbsolute(path))
    })
  })

  it('should return true if path is absolute', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      ['/home/foo'],
      ['/home/foo/..'],
      [posix.sep]
    ]

    // Act + Expect
    cases.forEach(([path]) => {
      expect(testSubject(path)).to.equal(posix.isAbsolute(path))
    })
  })

  describe('windows', () => {
    it('should return false if path is not absolute', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        [''],
        ['C:cwd/another'],
        ['C:cwd\\another'],
        ['c'],
        ['c:'],
        ['directory/directory'],
        ['directory\\directory']
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.equal(win32.isAbsolute(path))
      })
    })

    it('should return true if path is absolute', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        ['//server'],
        ['//server/file'],
        ['\\\\server'],
        ['\\\\server\\file'],
        ['C:/Users/'],
        ['C:\\Users\\'],
        ['c:/'],
        ['c://'],
        ['c:\\'],
        [posix.sep.repeat(2)],
        [posix.sep],
        [win32.sep.repeat(2)]
      ]

      // Act + Expect
      cases.forEach(([path]) => {
        expect(testSubject(path)).to.equal(win32.isAbsolute(path))
      })
    })
  })
})
