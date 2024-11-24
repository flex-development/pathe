/**
 * @file Unit Tests - extnames
 * @module pathe/lib/tests/unit/extnames
 */

import dot from '#lib/dot'
import testSubject from '#lib/extnames'
import sep from '#lib/sep'

describe('unit:lib/extnames', () => {
  it.each<Parameters<typeof testSubject>>([
    [''],
    ['.remarkignore'],
    ['.remarkrc.mjs'],
    ['eslint.base.config.mjs'],
    ['grease.config.mjs'],
    ['src/lib/extnames.mts'],
    [dot],
    [new URL('file:///tsconfig.lib.prod.json')],
    [sep]
  ])('should return list of extensions (%j)', path => {
    expect(testSubject(path)).toMatchSnapshot()
  })
})
