/**
 * @file Unit Tests - Pathe
 * @module pathe/interfaces/tests/unit-d/Pathe
 */

import type TestSubject from '../pathe'
import type PlatformPath from '../platform-path'

describe('unit-d:interfaces/Pathe', () => {
  it('should match PlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformPath>()
  })
})
