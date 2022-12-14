/**
 * @file Type Tests - basename
 * @module pathe/lib/tests/unit-d/basename
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../basename'

describe('unit-d:lib/basename', () => {
  it('should match PlatformPath#basename', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['basename']>()
  })
})
