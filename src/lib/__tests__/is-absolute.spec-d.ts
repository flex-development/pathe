/**
 * @file Type Tests - isAbsolute
 * @module pathe/lib/tests/unit-d/isAbsolute
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../is-absolute'

describe('unit-d:lib/isAbsolute', () => {
  it('should match PlatformPath#isAbsolute', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<
      PlatformPath['isAbsolute']
    >()
  })
})
