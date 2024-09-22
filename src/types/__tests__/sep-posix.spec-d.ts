/**
 * @file Unit Tests - PosixSep
 * @module pathe/types/tests/unit-d/PosixSep
 */

import type TestSubject from '../sep-posix'

describe('unit-d:types/PosixSep', () => {
  it('should equal "/"', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<'/'>()
  })
})