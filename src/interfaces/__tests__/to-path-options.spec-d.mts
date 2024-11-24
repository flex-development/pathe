/**
 * @file Unit Tests - ToPathOptions
 * @module pathe/interfaces/tests/unit-d/ToPathOptions
 */

import type TestSubject from '#interfaces/to-path-options'
import type {
  FileUrlToPathOptions,
  PlatformOptions
} from '@flex-development/pathe'

describe('unit-d:interfaces/ToPathOptions', () => {
  it('should extend FileUrlToPathOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<FileUrlToPathOptions>()
  })

  it('should extend PlatformOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformOptions>()
  })
})
