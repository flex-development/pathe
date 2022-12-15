/**
 * @file Type Tests - changeExt
 * @module pathe/utils/tests/unit-d/changeExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../change-ext'

describe('unit-d:utils/changeExt', () => {
  it('should match Pathe#changeExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['changeExt']>()
  })
})
