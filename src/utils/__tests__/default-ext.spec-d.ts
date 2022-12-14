/**
 * @file Type Tests - defaultExt
 * @module pathe/lib/tests/unit-d/defaultExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../default-ext'

describe('unit-d:lib/defaultExt', () => {
  it('should match Pathe#defaultExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['defaultExt']>()
  })
})
