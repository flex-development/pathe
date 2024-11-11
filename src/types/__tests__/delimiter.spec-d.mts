/**
 * @file Unit Tests - Delimiter
 * @module pathe/types/tests/unit-d/Delimiter
 */

import type TestSubject from '#types/delimiter'
import type { PosixDelimiter, WindowsDelimiter } from '@flex-development/pathe'

describe('unit-d:types/Delimiter', () => {
  it('should extract PosixDelimiter', () => {
    expectTypeOf<TestSubject>().extract<PosixDelimiter>().not.toBeNever()
  })

  it('should extract WindowsDelimiter', () => {
    expectTypeOf<TestSubject>().extract<WindowsDelimiter>().not.toBeNever()
  })
})
