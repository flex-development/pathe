/**
 * @file Unit Tests - RelativeOptions
 * @module pathe/interfaces/tests/unit-d/RelativeOptions
 */

import type TestSubject from '#interfaces/relative-options'
import type { ResolveWithOptions } from '@flex-development/pathe'

describe('unit-d:interfaces/RelativeOptions', () => {
  it('should extend ResolveWithOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ResolveWithOptions>()
  })
})
