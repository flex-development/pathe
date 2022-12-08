/**
 * @file Type Tests - isSep
 * @module pathe/internal/tests/unit-d/isSep
 */

import type { Sep } from '#src/types'
import testSubject from '../is-sep'

describe('unit-d:internal/isSep', () => {
  it('should guard Sep', () => {
    expectTypeOf(testSubject).guards.toEqualTypeOf<Sep>()
  })
})
