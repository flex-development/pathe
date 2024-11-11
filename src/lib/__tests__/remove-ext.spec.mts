/**
 * @file Unit Tests - removeExt
 * @module pathe/lib/tests/unit/removeExt
 */

import testSubject from '#lib/remove-ext'

describe('unit:lib/removeExt', () => {
  it.each<Parameters<typeof testSubject>>([
    ['remove-ext.mjs', 'mjs'],
    ['remove-ext.mts', 'mts'],
    ['remove-ext.mjs', '.mjs'],
    ['remove-ext.mts', '.mts'],
    ['remove-ext.d.mts', 'd.mts'],
    ['remove-ext.d.mts', '.d.mts']
  ])('should return `path` with extension removed (%j, %j)', (path, ext) => {
    expect(testSubject(path, ext)).toMatchSnapshot()
  })

  it.each<Parameters<typeof testSubject>>([
    ['remove-ext.cjs', ''],
    ['remove-ext.cts', ' '],
    ['remove-ext.mjs', null],
    ['remove-ext.mts', undefined]
  ])('should return `path` without modications (%j, %j)', (path, ext) => {
    expect(testSubject(path, ext)).to.eq(path)
  })
})
