/**
 * @file Type Tests - addExt
 * @module pathe/utils/tests/unit-d/addExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../add-ext'

describe('unit-d:utils/addExt', () => {
  it('should match Pathe#addExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['addExt']>()
  })
})
