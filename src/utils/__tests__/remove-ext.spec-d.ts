/**
 * @file Type Tests - removeExt
 * @module pathe/lib/tests/unit-d/removeExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../remove-ext'

describe('unit-d:lib/removeExt', () => {
  it('should match Pathe#removeExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['removeExt']>()
  })
})
