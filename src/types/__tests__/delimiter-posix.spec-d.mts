/**
 * @file Unit Tests - PosixDelimiter
 * @module pathe/types/tests/unit-d/PosixDelimiter
 */

import type TestSubject from '#types/delimiter-posix'

describe('unit-d:types/PosixDelimiter', () => {
  it('should equal ":"', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<':'>()
  })
})
