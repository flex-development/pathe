/**
 * @file Type Tests - join
 * @module pathe/lib/tests/unit-d/join
 */

import type { PlatformPath } from '#src/interfaces'
import type testSubject from '../join'

describe('unit-d:lib/join', () => {
  it('should match PlatformPath#join', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<PlatformPath['join']>()
  })
})
