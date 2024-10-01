/**
 * @file Unit Tests - Sep
 * @module pathe/types/tests/unit-d/Sep
 */

import type TestSubject from '#types/sep'
import type { PosixSep, WindowsSep } from '@flex-development/pathe'

describe('unit-d:types/Sep', () => {
  it('should extract PosixSep', () => {
    expectTypeOf<TestSubject>().extract<PosixSep>().not.toBeNever()
  })

  it('should extract WindowsSep', () => {
    expectTypeOf<TestSubject>().extract<WindowsSep>().not.toBeNever()
  })
})
