/**
 * @file Unit Tests - extnames
 * @module pathe/lib/tests/unit/extnames
 */

import testSubject from '../extnames'

describe('unit:lib/extnames', () => {
  it.each<Parameters<typeof testSubject>>([
    [''],
    ['.'],
    ['.remarkignore'],
    ['.remarkrc.mjs'],
    ['/'],
    ['eslint.base.config.mjs'],
    ['grease.config.mjs'],
    ['src/lib/extnames.ts']
  ])('should return list of extensions (%j)', path => {
    expect(testSubject(path)).toMatchSnapshot()
  })
})
