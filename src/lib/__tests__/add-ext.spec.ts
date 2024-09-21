/**
 * @file Unit Tests - addExt
 * @module pathe/lib/tests/unit/addExt
 */

import testSubject from '../add-ext'

describe('unit:lib/addExt', () => {
  it.each<Parameters<typeof testSubject>>([
    ['add-ext', 'mjs'],
    ['add-ext.d', '.mts']
  ])('should return `path` with new extension (%j, %j)', (path, ext) => {
    expect(testSubject(path, ext)).toMatchSnapshot()
  })

  it.each<Parameters<typeof testSubject>>([
    ['add-ext', ''],
    ['add-ext', null],
    ['add-ext.d.mts', 'mts'],
    ['add-ext.d.mts', '.mts']
  ])('should return `path` without modications (%j, %j)', (path, ext) => {
    expect(testSubject(path, ext)).to.eq(path)
  })
})
