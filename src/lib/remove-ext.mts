/**
 * @file removeExt
 * @module pathe/lib/removeExt
 */

import validateString from '#internal/validate-string'
import validateURLString from '#internal/validate-url-string'
import formatExt from '#lib/format-ext'

export default removeExt

/**
 * Remove the file extension of `input`.
 *
 * Does nothing if `input` does not end with the provided file extension,
 * or if a file extension is not provided.
 *
 * @category
 *  utils
 *
 * @param {string} input
 *  The path or URL string to handle
 * @param {string | null | undefined} ext
 *  The file extension to remove
 * @return {string}
 *  `input` unmodified or with `ext` removed
 */
function removeExt(input: string, ext: string | null | undefined): string

/**
 * Remove the file extension of `url`.
 *
 * Does nothing if `url` does not end with the provided file extension, or if a
 * file extension is not provided.
 *
 * @category
 *  utils
 *
 * @param {URL} url
 *  The {@linkcode URL} to handle
 * @param {string | null | undefined} ext
 *  The file extension to remove
 * @return {URL}
 *  `url` unmodified or with `ext` removed
 */
function removeExt(url: URL, ext: string | null | undefined): URL

/**
 * Remove the file extension of `input`.
 *
 * Does nothing if `input` does not end with the provided file extension, or if
 * a file extension is not provided.
 *
 * @example
 *  removeExt('file') // 'file'
 * @example
 *  removeExt('file.mjs', 'mjs') // 'file'
 * @example
 *  removeExt('file.mjs', '.mjs') // 'file'
 * @example
 *  removeExt('file.d.mts', '.mjs') // 'file.d.mts'
 *
 * @category
 *  utils
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} ext
 *  The file extension to remove
 * @return {URL | string}
 *  `input` unmodified or with `ext` removed
 */
function removeExt(
  input: URL | string,
  ext: string | null | undefined
): URL | string

/**
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} ext
 *  The file extension to remove
 * @return {URL | string}
 *  `input` unmodified or with `ext` removed
 */
function removeExt(
  input: URL | string,
  ext: string | null | undefined
): URL | string {
  validateURLString(input, 'input')

  if (typeof input === 'string') {
    if (ext !== null && ext !== undefined) {
      validateString(ext, 'ext')
      ext = formatExt(ext)
    }

    if (!ext || !input.endsWith(ext)) return input
    return input.slice(0, input.lastIndexOf(ext))
  }

  return input.href = removeExt(input.href, ext), input
}
