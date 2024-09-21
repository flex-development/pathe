/**
 * @file Unit Tests - Ext
 * @module pathe/types/tests/unit-d/Ext
 */

import type Dot from '../dot'
import type TestSubject from '../ext'

describe('unit-d:types/Ext', () => {
  it('should equal `${Dot}${string}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${Dot}${string}`>()
  })
})
