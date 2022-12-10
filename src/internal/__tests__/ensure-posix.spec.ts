/**
 * @file Unit Tests - ensurePosix
 * @module pathe/internal/tests/unit/ensurePosix
 */

import delimiter from '#src/lib/delimiter'
import sep from '#src/lib/sep'
import testSubject from '../ensure-posix'

describe('unit:internal/ensurePosix', () => {
  let path: string

  beforeEach(() => {
    path = 'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'
  })

  it('should return path that meets posix standards', () => {
    // Arrange
    const segments: string[] = [
      `C:${sep}Windows${sep}system32`,
      `C:${sep}Windows`,
      `C:${sep}Program Files${sep}node${sep}`
    ]

    // Act + Expect
    expect(testSubject(path)).to.equal(segments.join(delimiter))
  })
})
