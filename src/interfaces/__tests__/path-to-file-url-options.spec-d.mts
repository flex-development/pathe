/**
 * @file Unit Tests - PathToFileUrlOptions
 * @module pathe/interfaces/tests/unit-d/PathToFileUrlOptions
 */

import type TestSubject from '#interfaces/path-to-file-url-options'
import type {
  PlatformOptions,
  ResolveWithOptions
} from '@flex-development/pathe'

describe('unit-d:interfaces/PathToFileUrlOptions', () => {
  it('should extend PlatformOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformOptions>()
  })

  it('should extend ResolveWithOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ResolveWithOptions>()
  })
})
