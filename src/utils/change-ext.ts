/**
 * @file Utilities - changeExt
 * @module pathe/utils/changeExt
 */

import validateString from '#src/internal/validate-string'
import extname from '#src/lib/extname'
import type { Ext } from '#src/types'
import {
  isNIL,
  trim,
  type EmptyString,
  type Nilable
} from '@flex-development/tutils'
import addExt from './add-ext'
import formatExt from './format-ext'
import removeExt from './remove-ext'

/**
 * Changes the file extension of the given `path`.
 *
 * Does nothing if a file extension isn't provided. If the file extension is an
 * empty string, however, `path`'s file extension will be removed.
 *
 * @example
 *  changeExt('file') // 'file'
 * @example
 *  changeExt('file.mjs', '') // 'file'
 * @example
 *  changeExt('file', 'mjs') // 'file.mjs'
 * @example
 *  changeExt('file', '.mjs') // 'file.mjs'
 * @example
 *  changeExt('file.mts', '.d.mts') // 'file.d.mts'
 *
 * @param {string} path - Path to evaluate
 * @param {Nilable<string>} [ext] - New file extension
 * @return {string} `path` unmodified or with changed file extension
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const changeExt = (path: string, ext?: Nilable<string>): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (isNIL(ext)) return path

  // validate file extension
  validateString(ext, 'ext')

  // ensure path does not end with dot character
  path = path.replace(/\.$/, '')

  /**
   * File extension of {@linkcode path}.
   *
   * @const {EmptyString | Ext} extension
   */
  const extension: EmptyString | Ext = extname(path)

  // remove file extension if new extension is empty string
  if (!trim(ext)) return removeExt(path, extension)

  return extension
    ? path.replace(new RegExp(`\\${extension}$`), formatExt(ext))
    : addExt(path, ext)
}

export default changeExt
