/**
 * @file Unit Tests - formatExt
 * @module pathe/lib/tests/unit/formatExt
 */

import testSubject from '../format-ext'

describe('unit:lib/formatExt', () => {
  it.each<Parameters<typeof testSubject>>([
    [' '],
    [' mjs'],
    [''],
    ['.ts '],
    ['d.mts'],
    [null]
  ])('should return formatted file extension (%j)', ext => {
    expect(testSubject(ext)).toMatchSnapshot()
  })
})
