/**
 * @file Utilities - addExt
 * @module pathe/utils/addExt
 */

import validateString from '#src/internal/validate-string'
import type { Nullable } from '@flex-development/tutils'
import formatExt from './format-ext'

/**
 * Appends a file extension to the given `path` if and only if the path does not
 * already have that exact file extension.
 *
 * Does nothing if a file extension is not provided.
 *
 * @example
 *  addExt('file') // 'file'
 * @example
 *  addExt('file', 'mjs') // 'file.mjs'
 * @example
 *  addExt('file', '.mjs') // 'file.mjs'
 * @example
 *  addExt('file.d.mts', '.mts') // 'file.d.mts'
 *
 * @param {string} path - Path to evaluate
 * @param {Nullable<string>} [ext] - File extension to add
 * @return {string} `path` unmodified or with `ext` appended
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const addExt = (path: string, ext?: Nullable<string>): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (ext === null || ext === undefined) return path
  // validate file extension
  else validateString(ext, 'ext')

  // exit early if extension is empty string or path already ends with extension
  if (!ext.trim() || path.endsWith(ext.replace(/^\./, ''))) return path

  return `${path.replace(/\.$/, '')}${formatExt(ext)}`
}

export default addExt
