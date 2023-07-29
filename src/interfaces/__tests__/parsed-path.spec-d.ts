/**
 * @file Unit Tests - ParsedPath
 * @module pathe/interfaces/tests/unit-d/ParsedPath
 */

import type TestSubject from '../parsed-path'

describe('unit-d:interfaces/ParsedPath', () => {
  it('should match [base: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('base').toEqualTypeOf<string>()
  })

  it('should match [dir: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('dir').toEqualTypeOf<string>()
  })

  it('should match [ext: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('ext').toEqualTypeOf<string>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })

  it('should match [root: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('root').toEqualTypeOf<string>()
  })
})
