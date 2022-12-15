/**
 * @file Type Tests - defaultExt
 * @module pathe/utils/tests/unit-d/defaultExt
 */

import type { Pathe } from '#src/interfaces'
import type testSubject from '../default-ext'

describe('unit-d:utils/defaultExt', () => {
  it('should match Pathe#defaultExt', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<Pathe['defaultExt']>()
  })
})
