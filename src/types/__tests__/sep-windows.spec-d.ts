/**
 * @file Unit Tests - WindowsSep
 * @module pathe/types/tests/unit-d/WindowsSep
 */

import type TestSubject from '#types/sep-windows'

describe('unit-d:types/WindowsSep', () => {
  it('should equal "\\"', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<'\\'>()
  })
})
