/**
 * @file Utilities - changeExt
 * @module pathe/utils/changeExt
 */

import validateString from '#src/internal/validate-string'
import extname from '#src/lib/extname'
import type { Ext } from '#src/types'
import type { EmptyString, Nullable } from '@flex-development/tutils'
import addExt from './add-ext'
import formatExt from './format-ext'

/**
 * Changes the file extension of the given `path`. If `path` does not have an
 * extension, the new file extension will be added instead.
 *
 * Does nothing if a file extension isn't provided.
 *
 * @example
 *  changeExt('file') // 'file'
 * @example
 *  changeExt('file', 'mjs') // 'file.mjs'
 * @example
 *  changeExt('file', '.mjs') // 'file.mjs'
 * @example
 *  changeExt('file.mts', '.d.mts') // 'file.d.mts'
 *
 * @param {string} path - Path to evaluate
 * @param {Nullable<string>} [ext] - File extension to add
 * @return {string} `path` unmodified or with new file extension
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const changeExt = (path: string, ext?: Nullable<string>): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (ext === null || ext === undefined) return path
  // validate file extension
  else validateString(ext, 'ext')

  // exit early if extension is empty string
  if (!ext.trim()) return path

  // ensure path does not end with dot character
  path = path.replace(/\.$/, '')

  /**
   * File extension of {@linkcode path}.
   *
   * @const {EmptyString | Ext} extension
   */
  const extension: EmptyString | Ext = extname(path)

  return extension
    ? path.replace(new RegExp(`\\${extension}$`), formatExt(ext))
    : addExt(path, ext)
}

export default changeExt
