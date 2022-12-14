/**
 * @file Type Tests - toNamespacedPath
 * @module pathe/lib/tests/unit-d/toNamespacedPath
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../to-namespaced-path'

describe('unit-d:lib/toNamespacedPath', () => {
  it('should match PlatformPath#toNamespacedPath', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<
      PlatformPath['toNamespacedPath']
    >()
  })
})
