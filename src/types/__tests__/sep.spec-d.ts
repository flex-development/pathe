/**
 * @file Unit Tests - Sep
 * @module pathe/types/tests/unit-d/Sep
 */

import type TestSubject from '../sep'
import type PosixSep from '../sep-posix'
import type WindowsSep from '../sep-windows'

describe('unit-d:types/Sep', () => {
  it('should extract PosixSep', () => {
    expectTypeOf<TestSubject>().extract<PosixSep>().not.toBeNever()
  })

  it('should extract WindowsSep', () => {
    expectTypeOf<TestSubject>().extract<WindowsSep>().not.toBeNever()
  })
})
