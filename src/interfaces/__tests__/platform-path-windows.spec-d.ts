/**
 * @file Unit Tests - WindowsPlatformPath
 * @module pathe/interfaces/tests/unit-d/WindowsPlatformPath
 */

import type TestSubject from '#interfaces/platform-path-windows'
import type {
  PlatformPath,
  PosixPlatformPath,
  WindowsDelimiter,
  WindowsSep
} from '@flex-development/pathe'
import type { ReadonlyKeys } from '@flex-development/tutils'

describe('unit-d:interfaces/WindowsPlatformPath', () => {
  it('should extend PlatformPath', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<PlatformPath>()
  })

  it('should match [readonly delimiter: WindowsDelimiter]', () => {
    expectTypeOf<'delimiter'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('delimiter')
      .toEqualTypeOf<WindowsDelimiter>()
  })

  it('should match [readonly posix: PosixPlatformPath]', () => {
    expectTypeOf<'posix'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('posix')
      .toEqualTypeOf<PosixPlatformPath>()
  })

  it('should match [readonly sep: WindowsSep]', () => {
    expectTypeOf<'sep'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('sep')
      .toEqualTypeOf<WindowsSep>()
  })

  it('should match [readonly win32: WindowsPlatformPath]', () => {
    expectTypeOf<'win32'>().toMatchTypeOf<ReadonlyKeys<TestSubject>>()
    expectTypeOf<TestSubject>()
      .toHaveProperty('win32')
      .toEqualTypeOf<TestSubject>()
  })
})
