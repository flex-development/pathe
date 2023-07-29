/**
 * @file Unit Tests - PathObject
 * @module pathe/interfaces/tests/unit-d/PathObject
 */

import type { Optional, RequiredKeys } from '@flex-development/tutils'
import type TestSubject from '../path-object'

describe('unit-d:interfaces/PathObject', () => {
  it('should allow empty object', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toBeNever()
  })

  it('should match [base?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('base')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [dir?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('dir')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [ext?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('ext')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [name?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [root?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Optional<string>>()
  })
})
