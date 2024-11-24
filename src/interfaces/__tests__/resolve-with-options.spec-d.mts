/**
 * @file Unit Tests - ResolveWithOptions
 * @module pathe/interfaces/tests/unit-d/ResolveWithOptions
 */

import type TestSubject from '#interfaces/resolve-with-options'
import type { Cwd } from '@flex-development/pathe'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/ResolveWithOptions', () => {
  it('should match [cwd?: Cwd | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('cwd')
      .toEqualTypeOf<Nilable<Cwd>>()
  })

  it('should match [env?: Partial<Record<string, string>> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('env')
      .toEqualTypeOf<Nilable<Partial<Record<string, string>>>>()
  })
})
