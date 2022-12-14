/**
 * @file Unit Tests - PlatformPath
 * @module pathe/interfaces/tests/unit-d/PlatformPath
 */

import type path from 'node:path'
import type TestSubject from '../platform-path'

describe('unit-d:interfaces/PlatformPath', () => {
  it('should match path.PlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<path.PlatformPath>()
  })
})
