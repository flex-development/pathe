/**
 * @file Type Tests - validateString
 * @module pathe/internal/tests/unit-d/validateString
 */

import testSubject from '../validate-string'

describe('unit-d:internal/validateString', () => {
  it('should extract string guard value', () => {
    expectTypeOf(testSubject).guards.toBeString()
  })
})
