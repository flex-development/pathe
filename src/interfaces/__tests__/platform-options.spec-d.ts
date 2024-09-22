/**
 * @file Unit Tests - PlatformOptions
 * @module pathe/interfaces/tests/unit-d/PlatformOptions
 */

import type { Nilable } from '@flex-development/tutils'
import type TestSubject from '../platform-options'

describe('unit-d:interfaces/PlatformOptions', () => {
  it('should match [windows?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('windows')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
