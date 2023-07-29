/**
 * @file Utilities - removeExt
 * @module pathe/utils/removeExt
 */

import validateString from '#src/internal/validate-string'
import { isNIL, regexp, trim, type Nilable } from '@flex-development/tutils'
import formatExt from './format-ext'

/**
 * Removes a file extension from the given `path`.
 *
 * Does nothing if `path` does not end with the provided file extension, or if a
 * file extension isn't provided.
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
 * @param {string} path - Path to evaluate
 * @param {Nilable<string>} [ext] - File extension to removed
 * @return {string} `path` unmodified or with `ext` removed
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const removeExt = (path: string, ext?: Nilable<string>): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (isNIL(ext)) return path

  // validate file extension
  validateString(ext, 'ext')

  // exit early if extension is empty string
  if (!trim(ext)) return path

  return path.replace(new RegExp(`${regexp(formatExt(ext))}$`), '')
}

export default removeExt
