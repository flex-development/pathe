/**
 * @file Unit Tests - removeExt
 * @module pathe/lib/tests/unit/removeExt
 */

import testSubject from '#lib/remove-ext'

describe('unit:lib/removeExt', () => {
  it.each<[URL, string | null | undefined]>([
    [new URL('file:///remove-ext.d.mts'), '.d.mts'],
    [new URL('file:///remove-ext.d.mts'), 'd.mts'],
    [new URL('file:///remove-ext.mjs'), '.mjs'],
    [new URL('file:///remove-ext.mjs'), 'mjs'],
    [new URL('file:///remove-ext.mts'), '.mts'],
    [new URL('file:///remove-ext.mts'), 'mts']
  ])('should return `input` with extension removed (%j, %j)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').with.extname('')
    expect(result).to.have.property('href').endWith(result.pathname)
  })

  it.each<[URL, string | null | undefined]>([
    [new URL('file:///remove-ext.cjs'), ''],
    [new URL('file:///remove-ext.cts'), ' '],
    [new URL('file:///remove-ext.mjs'), null],
    [new URL('file:///remove-ext.mts'), undefined]
  ])('should return `input` without modications (%j, %j)', (input, ext) => {
    // Arrange
    const clone: URL = new URL(input)

    // Act + Expect
    expect(testSubject(input, ext)).to.eq(input).and.eql(clone)
  })
})
