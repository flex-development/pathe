/**
 * @file addExt
 * @module pathe/lib/addExt
 */

import validateString from '#internal/validate-string'
import validateURLString from '#internal/validate-url-string'
import extname from '#lib/extname'
import formatExt from '#lib/format-ext'

export default addExt

/**
 * Append a file extension to `input`.
 *
 * Does nothing if a file extension is not provided, or the {@linkcode extname}
 * of `input` is already `ext`.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {string} input
 *  The path or URL string to handle
 * @param {string | null | undefined} ext
 *  The file extension to add
 * @return {string}
 *  `input` unmodified or with new extension
 */
function addExt(
  this: void,
  input: string,
  ext: string | null | undefined
): string

/**
 * Append a file extension to `url`.
 *
 * Does nothing if a file extension is not provided, or the {@linkcode extname}
 * of `url` is already `url`.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL} url
 *  The {@linkcode URL} to handle
 * @param {string | null | undefined} ext
 *  The file extension to add
 * @return {URL}
 *  `url` unmodified or with new extension
 */
function addExt(this: void, url: URL, ext: string | null | undefined): URL

/**
 * Append a file extension to `input`.
 *
 * Does nothing if a file extension is not provided, or the {@linkcode extname}
 * of `input` is already `ext`.
 *
 * @example
 *  addExt('file', null) // 'file'
 * @example
 *  addExt('file', 'mjs') // 'file.mjs'
 * @example
 *  addExt('file', '.mjs') // 'file.mjs'
 * @example
 *  addExt('file.d.mts', '.mts') // 'file.d.mts'
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} ext
 *  The file extension to add
 * @return {URL | string}
 *  `input` unmodified or with new extension
 */
function addExt(
  this: void,
  input: URL | string,
  ext: string | null | undefined
): URL | string

/**
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} ext
 *  The file extension to add
 * @return {URL | string}
 *  `input` unmodified or with new extension
 */
function addExt(
  this: void,
  input: URL | string,
  ext: string | null | undefined
): URL | string {
  validateURLString(input, 'input')

  if (typeof input === 'string') {
    if (ext !== null && ext !== undefined) {
      validateString(ext, 'ext')
      ext = formatExt(ext)
    }

    if (ext && extname(input) !== ext) input += ext
    return input
  }

  return input.href = addExt(input.href, ext), input
}
