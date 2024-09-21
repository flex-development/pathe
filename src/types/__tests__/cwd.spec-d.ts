/**
 * @file Unit Tests - Cwd
 * @module pathe/types/tests/unit-d/Cwd
 */

import type TestSubject from '../cwd'

describe('unit-d:types/Cwd', () => {
  describe('returns', () => {
    it('should return string', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<string>()
    })
  })
})
