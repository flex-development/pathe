/**
 * @file Unit Tests - delimiter
 * @module pathe/lib/tests/unit/delimiter
 */

import path from 'node:path'
import TEST_SUBJECT from '../delimiter'

describe('unit:lib/delimiter', () => {
  it('should equal path.posix.delimiter', () => {
    expect(TEST_SUBJECT).to.eq(path.posix.delimiter)
  })
})
