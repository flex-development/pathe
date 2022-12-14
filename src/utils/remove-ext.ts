/**
 * @file Utilities - removeExt
 * @module pathe/utils/removeExt
 */

import validateString from '#src/internal/validate-string'
import type { Nullable } from '@flex-development/tutils'
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
 *  removeExt('file.mjs', '.ts') // 'file.mjs'
 * @example
 *  removeExt('file.min.mjs', '.mjs') // 'file.min'
 *
 * @param {string} path - Path to evaluate
 * @param {Nullable<string>} [ext] - File extension to removed
 * @return {string} `path` unmodified or with `ext` removed
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const removeExt = (path: string, ext?: Nullable<string>): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (ext === null || ext === undefined) return path
  // validate file extension
  else validateString(ext, 'ext')

  // exit early if extension is empty string
  if (!ext.trim()) return path

  return path.replace(new RegExp(`\\${formatExt(ext)}$`), '')
}

export default removeExt
