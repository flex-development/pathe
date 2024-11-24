/**
 * @file Unit Tests - toPath
 * @module pathe/lib/tests/unit/toPath
 */

import dot from '#lib/dot'
import testSubject from '#lib/to-path'
import { posix, win32 } from 'node:path'

describe('unit:lib/toPath', () => {
  it.each<[URL | string]>([
    ['file:///package.json'],
    ['t' + posix.delimiter + win32.sep + 'package.json'],
    [dot.repeat(2) + posix.sep + 'to-path.mts'],
    [dot],
    [new URL('file:')],
    [new URL('node:test')],
    [posix.sep + 'package.json'],
    [posix.sep],
    [win32.sep]
  ])('should return `input` as path (%j)', input => {
    // Arrange
    const list: readonly (URL | string)[] = [input]

    // Act
    const result = testSubject(list)

    // Expect
    expect(result).to.be.an('array').of.length(list.length).and.not.eq(list)
    expect(result[0]).toMatchSnapshot()
  })
})
