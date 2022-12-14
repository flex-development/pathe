/**
 * @file Type Tests - extname
 * @module pathe/lib/tests/unit-d/extname
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../extname'

describe('unit-d:lib/extname', () => {
  it('should match PlatformPath#extname', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['extname']>()
  })
})
