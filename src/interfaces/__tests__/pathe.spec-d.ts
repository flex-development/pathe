/**
 * @file Unit Tests - Pathe
 * @module pathe/interfaces/tests/unit-d/Pathe
 */

import type * as lib from '#lib/index'
import type TestSubject from '../pathe'
import type PosixPlatformPath from '../platform-path-posix'

describe('unit-d:interfaces/Pathe', () => {
  it('should extend PosixPlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PosixPlatformPath>()
  })

  it('should register library functions', () => {
    assertType<typeof lib>(<Omit<TestSubject, 'posix' | 'win32'>>{})
  })
})
