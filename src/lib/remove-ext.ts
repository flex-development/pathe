/**
 * @file removeExt
 * @module pathe/lib/removeExt
 */

import validateString from '#internal/validate-string'
import formatExt from './format-ext'

/**
 * Remove the file extension of `path`.
 *
 * Does nothing if `path` does not end with the provided file extension, or if a
 * file extension is not provided.
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
 * @param {string} path
 *  Path to handle
 * @param {string | null | undefined} ext
 *  File extension to remove
 * @return {string}
 *  `path` unmodified or with `ext` removed
 */
function removeExt(path: string, ext: string | null | undefined): string {
  validateString(path, 'path')

  if (ext !== null && ext !== undefined) {
    validateString(ext, 'ext')
    ext = formatExt(ext)
  }

  if (!ext || !path.endsWith(ext)) return path
  return path.slice(0, path.lastIndexOf(ext))
}

export default removeExt
