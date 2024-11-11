/**
 * @file Unit Tests - delimiter
 * @module pathe/lib/tests/unit/delimiter
 */

import TEST_SUBJECT from '#lib/delimiter'
import path from 'node:path'

describe('unit:lib/delimiter', () => {
  it('should equal path.posix.delimiter', () => {
    expect(TEST_SUBJECT).to.eq(path.posix.delimiter)
  })
})
