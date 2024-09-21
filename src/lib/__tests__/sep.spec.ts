/**
 * @file Unit Tests - sep
 * @module pathe/lib/tests/unit/sep
 */

import path from 'node:path'
import TEST_SUBJECT from '../sep'

describe('unit:lib/sep', () => {
  it('should equal path.posix.sep', () => {
    expect(TEST_SUBJECT).to.eq(path.posix.sep)
  })
})
