/**
 * @file changeExt
 * @module pathe/lib/changeExt
 */

import validateString from '#internal/validate-string'
import validateURLString from '#internal/validate-url-string'
import addExt from '#lib/add-ext'
import extname from '#lib/extname'
import formatExt from '#lib/format-ext'
import removeExt from '#lib/remove-ext'
import type { EmptyString, Ext } from '@flex-development/pathe'

export default changeExt

/**
 * Change the file extension of `input`.
 *
 * Does nothing if the file extension of `input` is already `ext`.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {string} input
 *  The path or URL string to handle
 * @param {string | null | undefined} [ext]
 *  The file extension to add
 * @return {string}
 *  `input` unmodified or with changed file extension
 */
function changeExt(
  this: void,
  input: string,
  ext?: string | null | undefined
): string

/**
 * Change the file extension of `url`.
 *
 * Does nothing if the file extension of `url` is already `ext`.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL} url
 *  The {@linkcode URL} to handle
 * @param {string | null | undefined} [ext]
 *  The file extension to add
 * @return {URL}
 *  `url` unmodified or with changed file extension
 */
function changeExt(this: void, url: URL, ext?: string | null | undefined): URL

/**
 * Change the file extension of `input`.
 *
 * Does nothing if the file extension of `input` is already `ext`.
 *
 * @example
 *  changeExt('file') // 'file'
 * @example
 *  changeExt('file.mjs', null) // 'file'
 * @example
 *  changeExt('file', 'mjs') // 'file.mjs'
 * @example
 *  changeExt('file', '.mjs') // 'file.mjs'
 * @example
 *  changeExt('file.mts', '.d.mts') // 'file.d.mts'
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} [ext]
 *  The file extension to add
 * @return {URL | string}
 *  `input` unmodified or with changed file extension
 */
function changeExt(
  this: void,
  input: URL | string,
  ext?: string | null | undefined
): URL | string

/**
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} [ext]
 *  The file extension to add
 * @return {URL | string}
 *  `input` unmodified or with changed file extension
 */
function changeExt(
  this: void,
  input: URL | string,
  ext?: string | null | undefined
): URL | string {
  validateURLString(input, 'input')

  if (typeof input === 'string') {
    if (ext !== null && ext !== undefined) {
      validateString(ext, 'ext')
      ext = formatExt(ext)
    }

    /**
     * File extension of {@linkcode input}.
     *
     * @const {EmptyString | Ext} extension
     */
    const extension: EmptyString | Ext = extname(input)

    input = removeExt(input, extension)

    if (!ext) return input
    return addExt(input, ext)
  }

  return input.href = changeExt(input.href, ext), input
}
