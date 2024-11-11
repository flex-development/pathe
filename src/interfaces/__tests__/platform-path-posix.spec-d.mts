/**
 * @file Unit Tests - PosixPlatformPath
 * @module pathe/interfaces/tests/unit-d/PosixPlatformPath
 */

import type TestSubject from '#interfaces/platform-path-posix'
import type {
  PlatformPath,
  PosixDelimiter,
  PosixSep,
  WindowsPlatformPath
} from '@flex-development/pathe'
import type { ReadonlyKeys } from '@flex-development/tutils'

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
