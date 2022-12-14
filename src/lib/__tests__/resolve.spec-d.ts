/**
 * @file Type Tests - resolve
 * @module pathe/lib/tests/unit-d/resolve
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../resolve'

describe('unit-d:lib/resolve', () => {
  it('should match PlatformPath#resolve', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['resolve']>()
  })
})
