/**
 * @file Unit Tests - extToValue
 * @module pathe/lib/tests/unit/extToValue
 */

import changeExt from '#lib/change-ext'
import testSubject from '#lib/ext-to-value'
import pathToFileURL from '#lib/path-to-file-url'
import removeExt from '#lib/remove-ext'
import type { EmptyString, Ext } from '@flex-development/pathe'
import type { Loader } from 'esbuild'

describe('unit:lib/extToValue', () => {
  let map: Record<EmptyString | Ext, Loader>

  beforeAll(() => {
    map = { '': 'ts', '.d.mts': 'copy', '.mts': 'ts', '.npmrc': 'copy' }
  })

  it.each<[URL | string, Loader | undefined]>([
    ['.npmrc', 'copy'],
    [changeExt(import.meta.url, 'cts'), undefined],
    [import.meta.url, 'ts'],
    [pathToFileURL('dist/lib/ext-to-value.d.mts'), 'copy'],
    [removeExt(import.meta.url, 'spec.mts'), 'ts']
  ])('should return value based on file extension of `input` (%#)', (
    input,
    expected
  ) => {
    expect(testSubject(input, map)).to.eq(expected)
  })
})
