/**
 * @file Unit Tests - WindowsDelimiter
 * @module pathe/types/tests/unit-d/WindowsDelimiter
 */

import type TestSubject from '../delimiter-windows'

describe('unit-d:types/WindowsDelimiter', () => {
  it('should equal ";"', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<';'>()
  })
})
