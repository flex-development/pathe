/**
 * @file Unit Tests - addExt
 * @module pathe/lib/tests/unit/addExt
 */

import testSubject from '#lib/add-ext'
import formatExt from '#lib/format-ext'

describe('unit:lib/addExt', () => {
  it.each<[URL, string | null | undefined]>([
    [new URL('file:///dist/lib/add-ext.d'), '.mts'],
    [new URL('file:///src/lib/add-ext'), 'mjs']
  ])('should return `input` with new extension (%j, %j)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').with.extname(formatExt(ext))
    expect(result).to.have.property('href').endWith(result.pathname)
  })

  it.each<[URL, string | null | undefined]>([
    [new URL('file:///dist/lib/add-ext.mjs'), ''],
    [new URL('file:///dist/lib/add-ext.d.mts'), '.mts']
  ])('should return `input` without modications (%j, %j)', (input, ext) => {
    // Arrange
    const clone: URL = new URL(input)

    // Act + Expect
    expect(testSubject(input, ext)).to.eq(input).and.eql(clone)
  })
})
