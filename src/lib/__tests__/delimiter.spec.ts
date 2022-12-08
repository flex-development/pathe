/**
 * @file Unit Tests - delimiter
 * @module pathe/lib/tests/unit/delimiter
 */

import { posix } from 'node:path'
import TEST_SUBJECT from '../delimiter'

describe('unit:lib/delimiter', () => {
  it('should return posix path delimiter', () => {
    expect(TEST_SUBJECT).to.equal(posix.delimiter)
  })
})
