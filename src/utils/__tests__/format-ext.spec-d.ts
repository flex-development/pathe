/**
 * @file Type Tests - formatExt
 * @module pathe/lib/tests/unit-d/formatExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../format-ext'

describe('unit-d:lib/formatExt', () => {
  it('should match Pathe#formatExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['formatExt']>()
  })
})
