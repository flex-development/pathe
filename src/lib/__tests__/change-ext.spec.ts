/**
 * @file Unit Tests - changeExt
 * @module pathe/lib/tests/unit/changeExt
 */

import testSubject from '../change-ext'

describe('unit:lib/changeExt', () => {
  it.each<Parameters<typeof testSubject>>([
    ['change-ext', 'mjs'],
    ['change-ext.', '.mjs'],
    ['change-ext.min.cjs', '.mjs'],
    ['change-ext.mjs', ''],
    ['change-ext.mjs', null],
    ['change-ext.mts', 'd.mts']
  ])('should return `path` with changed extension (%j, %j)', (path, ext) => {
    expect(testSubject(path, ext)).toMatchSnapshot()
  })
})
