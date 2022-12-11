/**
 * @file Unit Tests - ParsedPath
 * @module pathe/interfaces/tests/unit-d/ParsedPath
 */

import type TestSubject from '../parsed-path'
import type PathObject from '../path-object'

describe('unit-d:interfaces/ParsedPath', () => {
  it('should extend Required<PathObject>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Required<PathObject>>()
  })
})
