/**
 * @file Unit Tests - PlatformOptions
 * @module pathe/interfaces/tests/unit-d/PlatformOptions
 */

import type TestSubject from '#interfaces/platform-options'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/PlatformOptions', () => {
  it('should match [windows?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('windows')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
