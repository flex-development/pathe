/**
 * @file Unit Tests - FormatInputPathObject
 * @module pathe/interfaces/tests/unit-d/FormatInputPathObject
 */

import type { Nilable } from '@flex-development/tutils'
import type path from 'node:path'
import type TestSubject from '../format-input-path-object'
import type ParsedPath from '../parsed-path'

describe('unit-d:interfaces/FormatInputPathObject', () => {
  it('should allow ParsedPath', () => {
    assertType<TestSubject>(<ParsedPath>{})
  })

  it('should allow path.FormatInputPathObject', () => {
    assertType<TestSubject>(<path.FormatInputPathObject>{})
  })

  it('should allow path.ParsedPath', () => {
    assertType<TestSubject>(<path.ParsedPath>{})
  })

  it('should have path.FormatInputPathObject keys', () => {
    // Arrange
    type Baseline = keyof path.FormatInputPathObject
    type Subject = keyof TestSubject

    // Expect
    expectTypeOf<Exclude<Baseline, Subject>>().toEqualTypeOf<never>()
  })

  it('should match [base?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('base')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [dir?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('dir')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [ext?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('ext')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [name?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('name')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [root?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Nilable<string>>()
  })
})
