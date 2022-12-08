/**
 * @file Unit Tests - basename
 * @module pathe/lib/tests/unit/basename
 * @see https://github.com/nodejs/node/blob/main/test/parallel/test-path-basename.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../basename'

describe('unit:lib/basename', () => {
  it('should ignore suffix if not found in path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      ['file', '.js'],
      ['file.js', '.ts'],
      ['js', '.js']
    ]

    // Act + Expect
    cases.forEach(([path, suffix]) => {
      expect(testSubject(path, suffix)).to.equal(posix.basename(path, suffix))
    })
  })

  it('should return last portion of path', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [''],
      ['~'],
      ['/a/b'],
      ['/aaa/'],
      ['/aaa/b'],
      ['/aaa/bbb'],
      ['/aaa/bbb//'],
      ['/basename.ext'],
      ['/dir/basename.ext'],
      ['aaa/bbb//'],
      ['basename.ext'],
      ['basename.ext/'],
      ['basename.ext//'],
      [import.meta.url]
    ]

    // Act + Expect
    cases.forEach(([path, suffix]) => {
      expect(testSubject(path, suffix)).to.equal(posix.basename(path, suffix))
    })
  })

  it('should return last portion of path without suffix', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      ['.js', '.js'],
      ['/aaa/bbb', '/bbb'],
      ['/aaa/bbb', 'a/bbb'],
      ['/aaa/bbb', 'b'],
      ['/aaa/bbb', 'bb'],
      ['/aaa/bbb', 'bbb'],
      ['/aaa/bbb//', 'bbb'],
      ['a', 'a'],
      ['aaa/bbb', '/bbb'],
      ['aaa/bbb', 'a/bbb'],
      ['aaa/bbb', 'b'],
      ['aaa/bbb', 'bb'],
      ['aaa/bbb', 'bbb'],
      ['aaa/bbb//', 'bbb'],
      ['file.js.old', '.js.old'],
      [import.meta.url, '.ts']
    ]

    // Act + Expect
    cases.forEach(([path, suffix]) => {
      expect(testSubject(path, suffix)).to.equal(posix.basename(path, suffix))
    })
  })

  describe('windows', () => {
    it('should ignore suffix if not found in path', () => {
      // Arrange
      const suffix: string = '.html'
      const path: string = 'C:\\foo.HTML'

      // Act + Expect
      expect(testSubject(path, suffix)).to.equal(win32.basename(path, suffix))
    })

    it('should return last portion of path', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
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
        ['aaa\\bbb\\\\\\\\'],
        ['basename.ext'],
        ['basename.ext\\'],
        ['basename.ext\\\\'],
        ['file:stream'],
        ['foo']
      ]

      // Act + Expect
      cases.forEach(([path, suffix]) => {
        expect(testSubject(path, suffix)).to.equal(win32.basename(path, suffix))
      })
    })

    it('should return last portion of path without suffix', () => {
      // Arrange
      const cases: Parameters<typeof testSubject>[] = [
        ['a', 'a'],
        ['aaa\\bbb', '\\bbb'],
        ['aaa\\bbb', 'a\\bbb'],
        ['aaa\\bbb', 'b'],
        ['aaa\\bbb', 'bb'],
        ['aaa\\bbb', 'bbb'],
        ['aaa\\bbb\\\\\\\\', 'bbb']
      ]

      // Act + Expect
      cases.forEach(([path, suffix]) => {
        expect(testSubject(path, suffix)).to.equal(win32.basename(path, suffix))
      })
    })
  })
})
