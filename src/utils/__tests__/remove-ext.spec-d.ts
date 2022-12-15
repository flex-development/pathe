/**
 * @file Type Tests - removeExt
 * @module pathe/utils/tests/unit-d/removeExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../remove-ext'

describe('unit-d:utils/removeExt', () => {
  it('should match Pathe#removeExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['removeExt']>()
  })
})
