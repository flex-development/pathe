/**
 * @file Unit Tests - Delimiter
 * @module pathe/types/tests/unit-d/Delimiter
 */

import type TestSubject from '../delimiter'

describe('unit-d:types/Delimiter', () => {
  it('should allow posix path delimiter', () => {
    assertType<TestSubject>(':')
  })
})
