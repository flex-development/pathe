/**
 * @file Type Tests - sep
 * @module pathe/lib/tests/unit-d/sep
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../sep'

describe('unit-d:lib/sep', () => {
  it('should match PlatformPath#sep', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['sep']>()
  })
})
