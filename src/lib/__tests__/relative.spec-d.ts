/**
 * @file Type Tests - relative
 * @module pathe/lib/tests/unit-d/relative
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../relative'

describe('unit-d:lib/relative', () => {
  it('should match PlatformPath#relative', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['relative']>()
  })
})
