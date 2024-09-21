/**
 * @file Unit Tests - PosixPlatformPath
 * @module pathe/interfaces/tests/unit-d/PosixPlatformPath
 */

import type { PosixDelimiter, PosixSep } from '@flex-development/pathe'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type PlatformPath from '../platform-path'
import type TestSubject from '../platform-path-posix'
import type WindowsPlatformPath from '../platform-path-windows'

describe('unit-d:interfaces/PosixPlatformPath', () => {
  it('should extend PlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformPath>()
  })

  it('should match [readonly delimiter: PosixDelimiter]', () => {
    expectTypeOf<'delimiter'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('delimiter')
      .toEqualTypeOf<PosixDelimiter>()
  })

  it('should match [readonly posix: PosixPlatformPath]', () => {
    expectTypeOf<'posix'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('posix')
      .toEqualTypeOf<TestSubject>()
  })

  it('should match [readonly sep: PosixSep]', () => {
    expectTypeOf<'sep'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>().toHaveProperty('sep').toEqualTypeOf<PosixSep>()
  })

  it('should match [readonly win32: WindowsPlatformPath]', () => {
    expectTypeOf<'win32'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('win32')
      .toEqualTypeOf<WindowsPlatformPath>()
  })
})
