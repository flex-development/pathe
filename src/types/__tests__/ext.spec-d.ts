/**
 * @file Unit Tests - Ext
 * @module pathe/types/tests/unit-d/Ext
 */

import type TestSubject from '../ext'

describe('unit-d:types/Ext', () => {
  it('should allow string beginning with dot character', () => {
    assertType<TestSubject>('.cjs')
    assertType<TestSubject>('.cts')
    assertType<TestSubject>('.json')
    assertType<TestSubject>('.mjs')
    assertType<TestSubject>('.mts')
    assertType<TestSubject>('.mts')
  })
})
