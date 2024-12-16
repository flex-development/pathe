/**
 * @file Unit Tests - changeExt
 * @module pathe/lib/tests/unit/changeExt
 */

import testSubject from '#lib/change-ext'
import formatExt from '#lib/format-ext'
import type { EmptyString } from '@flex-development/pathe'

describe('unit:lib/changeExt', () => {
  it.each<[URL, string]>([
    [new URL('file:///change-ext'), 'mjs'],
    [new URL('file:///change-ext.'), '.mjs'],
    [new URL('file:///change-ext.min.cjs'), '.mjs'],
    [new URL('file:///change-ext.mts'), 'd.mts']
  ])('should return `input` with changed extension (%j, %j)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').endWith(formatExt(ext))
    expect(result).to.have.property('href').endWith(result.pathname)
  })

  it.each<[URL, EmptyString | null]>([
    [new URL('file:///change-ext.cjs'), ''],
    [new URL('file:///change-ext.mjs'), null]
  ])('should return `input` without extension (%j, %j)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').with.extname('')
    expect(result).to.have.property('href').endWith(result.pathname)
  })
})
