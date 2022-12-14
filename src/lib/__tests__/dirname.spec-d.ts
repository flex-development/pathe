/**
 * @file Type Tests - dirname
 * @module pathe/lib/tests/unit-d/dirname
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../dirname'

describe('unit-d:lib/dirname', () => {
  it('should match PlatformPath#dirname', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['dirname']>()
  })
})
