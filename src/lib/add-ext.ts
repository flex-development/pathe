/**
 * @file addExt
 * @module pathe/lib/addExt
 */

import validateString from '#internal/validate-string'
import extname from '#lib/extname'
import formatExt from '#lib/format-ext'

/**
 * Append a file extension to `path`.
 *
 * Does nothing if a file extension is not provided, or the {@linkcode extname}
 * of `path` is already `ext`.
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
 * @param {string} path
 *  Path to handle
 * @param {string | null | undefined} ext
 *  File extension to add
 * @return {string}
 *  `path` unmodified or with new extension
 */
function addExt(path: string, ext: string | null | undefined): string {
  validateString(path, 'path')

  if (ext !== null && ext !== undefined) {
    validateString(ext, 'ext')
    ext = formatExt(ext)
  }

  if (!ext || extname(path) === ext) return path
  return path + ext
}

export default addExt
