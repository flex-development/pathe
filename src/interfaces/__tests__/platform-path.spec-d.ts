/**
 * @file Unit Tests - PlatformPath
 * @module pathe/interfaces/tests/unit-d/PlatformPath
 */

import type path from 'node:path'
import type TestSubject from '../platform-path'

describe('unit-d:interfaces/PlatformPath', () => {
  it('should have path.PlatformPath keys', () => {
    // Arrange
    type Baseline = keyof path.PlatformPath
    type Subject = keyof TestSubject

    // Expect
    expectTypeOf<Exclude<Baseline, Subject>>().toEqualTypeOf<'matchesGlob'>()
  })
})
