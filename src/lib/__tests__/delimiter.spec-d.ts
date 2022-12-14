/**
 * @file Type Tests - delimiter
 * @module pathe/lib/tests/unit-d/delimiter
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../delimiter'

describe('unit-d:lib/delimiter', () => {
  it('should match PlatformPath#delimiter', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<
      PlatformPath['delimiter']
    >()
  })
})
