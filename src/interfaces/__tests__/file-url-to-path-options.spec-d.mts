/**
 * @file Unit Tests - FileUrlToPathOptions
 * @module pathe/interfaces/tests/unit-d/FileUrlToPathOptions
 */

import type TestSubject from '#interfaces/file-url-to-path-options'
import type { PlatformOptions } from '@flex-development/pathe'

describe('unit-d:interfaces/FileUrlToPathOptions', () => {
  it('should extend PlatformOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformOptions>()
  })
})
