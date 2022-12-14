/**
 * @file Type Tests - changeExt
 * @module pathe/lib/tests/unit-d/changeExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../change-ext'

describe('unit-d:lib/changeExt', () => {
  it('should match Pathe#changeExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['changeExt']>()
  })
})
