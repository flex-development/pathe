/**
 * @file Type Tests - normalize
 * @module pathe/lib/tests/unit-d/normalize
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../normalize'

describe('unit-d:lib/normalize', () => {
  it('should match PlatformPath#normalize', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<
      PlatformPath['normalize']
    >()
  })
})
