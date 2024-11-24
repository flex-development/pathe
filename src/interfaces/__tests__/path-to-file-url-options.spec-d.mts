/**
 * @file Unit Tests - PathToFileUrlOptions
 * @module pathe/interfaces/tests/unit-d/PathToFileUrlOptions
 */

import type TestSubject from '#interfaces/path-to-file-url-options'
import type {
  PlatformOptions,
  ResolveWithOptions
} from '@flex-development/pathe'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/PathToFileUrlOptions', () => {
  it('should extend PlatformOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformOptions>()
  })

  it('should extend ResolveWithOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ResolveWithOptions>()
  })

  it('should match [string?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('string')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
