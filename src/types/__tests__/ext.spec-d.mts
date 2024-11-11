/**
 * @file Unit Tests - Ext
 * @module pathe/types/tests/unit-d/Ext
 */

import type { Dot } from '@flex-development/pathe'
import type TestSubject from '../ext'

describe('unit-d:types/Ext', () => {
  it('should equal `${Dot}${string}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${Dot}${string}`>()
  })
})
