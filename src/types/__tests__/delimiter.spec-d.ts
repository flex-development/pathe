/**
 * @file Unit Tests - Delimiter
 * @module pathe/types/tests/unit-d/Delimiter
 */

import type TestSubject from '../delimiter'
import type PosixDelimiter from '../delimiter-posix'
import type WindowsDelimiter from '../delimiter-windows'

describe('unit-d:types/Delimiter', () => {
  it('should extract PosixDelimiter', () => {
    expectTypeOf<TestSubject>().extract<PosixDelimiter>().not.toBeNever()
  })

  it('should extract WindowsDelimiter', () => {
    expectTypeOf<TestSubject>().extract<WindowsDelimiter>().not.toBeNever()
  })
})
