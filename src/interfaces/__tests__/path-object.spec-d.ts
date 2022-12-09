/**
 * @file Unit Tests - PathObject
 * @module pathe/interfaces/tests/unit-d/PathObject
 */

import type { KeysRequired } from '@flex-development/tutils'
import type TestSubject from '../path-object'

describe('unit-d:interfaces/PathObject', () => {
  it('should allow empty object', () => {
    expectTypeOf<KeysRequired<TestSubject>>().toBeNever()
  })

  it('should match [base?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('base')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [dir?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('dir')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [ext?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('ext')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [name?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<string | undefined>()
  })

  it('should match [root?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<string | undefined>()
  })
})
