/**
 * @file Unit Tests - sep
 * @module pathe/lib/tests/unit/sep
 */

import { posix } from 'node:path'
import TEST_SUBJECT from '../sep'

describe('unit:lib/sep', () => {
  it('should return posix segment separator', () => {
    expect(TEST_SUBJECT).to.equal(posix.sep)
  })
})
