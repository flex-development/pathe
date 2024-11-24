/**
 * @file Unit Tests - changeExt
 * @module pathe/lib/tests/unit/changeExt
 */

import testSubject from '#lib/change-ext'
import formatExt from '#lib/format-ext'
import pathToFileURL from '#lib/path-to-file-url'
import type { EmptyString } from '@flex-development/pathe'

describe('unit:lib/changeExt', () => {
  it.each<[URL, string]>([
    [pathToFileURL('/change-ext'), 'mjs'],
    [pathToFileURL('/change-ext.'), '.mjs'],
    [pathToFileURL('/change-ext.min.cjs'), '.mjs'],
    [pathToFileURL('/change-ext.mts'), 'd.mts']
  ])('should return `input` with changed extension (%#)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').endWith(formatExt(ext))
    expect(result).to.have.property('href').endWith(result.pathname)
  })

  it.each<[URL, (EmptyString | null | undefined)?]>([
    [pathToFileURL('/change-ext.cjs'), ''],
    [pathToFileURL('/change-ext.mjs'), null]
  ])('should return `input` without extension (%#)', (input, ext) => {
    // Act
    const result = testSubject(input, ext)

    // Expect
    expect(result).to.eq(input)
    expect(result).to.have.property('pathname').with.extname('')
    expect(result).to.have.property('href').endWith(result.pathname)
  })
})
