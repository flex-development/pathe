/**
 * @file Unit Tests - PlatformPath
 * @module pathe/interfaces/tests/unit-d/PlatformPath
 */

import type TestSubject from '#interfaces/platform-path'
import type path from 'node:path'

describe('unit-d:interfaces/PlatformPath', () => {
  it('should have path.PlatformPath keys', () => {
    // Arrange
    type Baseline = keyof path.PlatformPath
    type Subject = keyof TestSubject

    // Expect
    expectTypeOf<Exclude<Baseline, Subject>>().toEqualTypeOf<never>()
  })
})
