/**
 * @file Unit Tests - ParsedPath
 * @module pathe/interfaces/tests/unit-d/ParsedPath
 */

import type { EmptyString, Ext } from '@flex-development/pathe'
import type path from 'node:path'
import type TestSubject from '../parsed-path'

describe('unit-d:interfaces/ParsedPath', () => {
  it('should have path.ParsedPath keys', () => {
    // Arrange
    type Baseline = keyof path.ParsedPath
    type Subject = keyof TestSubject

    // Expect
    expectTypeOf<Exclude<Baseline, Subject>>().toEqualTypeOf<never>()
  })

  it('should match [base: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('base').toEqualTypeOf<string>()
  })

  it('should match [dir: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('dir').toEqualTypeOf<string>()
  })

  it('should match [ext: EmptyString | Ext]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('ext')
      .toEqualTypeOf<EmptyString | Ext>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })

  it('should match [root: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('root').toEqualTypeOf<string>()
  })
})
