/**
 * @file Type Tests - parse
 * @module pathe/lib/tests/unit-d/parse
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../parse'

describe('unit-d:lib/parse', () => {
  it('should match PlatformPath#parse', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['parse']>()
  })
})
