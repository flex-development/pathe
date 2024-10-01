/**
 * @file Unit Tests - Dot
 * @module pathe/types/tests/unit-d/Dot
 */

import type TestSubject from '#types/dot'

describe('unit-d:types/Dot', () => {
  it('should equal "."', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<'.'>()
  })
})
