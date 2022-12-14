/**
 * @file Type Tests - addExt
 * @module pathe/lib/tests/unit-d/addExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../add-ext'

describe('unit-d:lib/addExt', () => {
  it('should match Pathe#addExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['addExt']>()
  })
})
