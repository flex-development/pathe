/**
 * @file Unit Tests - toPosix
 * @module pathe/lib/tests/unit/toPosix
 */

import { sepWindows } from '#internal/constants'
import testSubject from '#lib/to-posix'

describe('unit:lib/toPosix', () => {
  it('should return `value` with posix separators', () => {
    // Arrange
    const url: URL = new URL('file:///C:\\path%5Cdir%5cindex.html')
    const value: [URL] = [url]

    // Act
    const result = testSubject(value)

    // Expect
    expect(result).to.eq(value)
    expect(result[0]).to.eq(url)
    expect(result[0].pathname).to.not.include(sepWindows).and.not.match(/%5c/i)
    expect(result[0].href).to.endWith(url.pathname)
  })
})
