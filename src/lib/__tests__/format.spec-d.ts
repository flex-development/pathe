/**
 * @file Type Tests - format
 * @module pathe/lib/tests/unit-d/format
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../format'

describe('unit-d:lib/format', () => {
  it('should match PlatformPath#format', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['format']>()
  })
})
