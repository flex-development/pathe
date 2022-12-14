/**
 * @file Unit Tests - Sep
 * @module pathe/types/tests/unit-d/Sep
 */

import type TestSubject from '../sep'

describe('unit-d:types/Sep', () => {
  it('should extract posix path segment separator', () => {
    expectTypeOf<TestSubject>().extract<'/'>().toBeString()
  })
})
