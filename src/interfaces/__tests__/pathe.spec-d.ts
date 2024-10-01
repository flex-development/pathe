/**
 * @file Unit Tests - Pathe
 * @module pathe/interfaces/tests/unit-d/Pathe
 */

import type TestSubject from '#interfaces/pathe'
import type * as lib from '#lib/index'
import type { PosixPlatformPath } from '@flex-development/pathe'

describe('unit-d:interfaces/Pathe', () => {
  it('should extend PosixPlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PosixPlatformPath>()
  })

  it('should register library functions', () => {
    assertType<typeof lib>(<Omit<TestSubject, 'posix' | 'win32'>>{})
  })
})
