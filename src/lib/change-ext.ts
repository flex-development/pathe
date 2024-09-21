/**
 * @file changeExt
 * @module pathe/lib/changeExt
 */

import validateString from '#internal/validate-string'
import extname from '#lib/extname'
import type { EmptyString, Ext } from '@flex-development/pathe'
import addExt from './add-ext'
import formatExt from './format-ext'
import removeExt from './remove-ext'

/**
 * Change the file extension of `path`.
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
 * @param {string} path
 *  Path to handle
 * @param {string | null | undefined} [ext]
 *  File extension to add
 * @return {string}
 *  `path` unmodified or with changed file extension
 */
function changeExt(path: string, ext?: string | null | undefined): string {
  validateString(path, 'path')

  if (ext !== null && ext !== undefined) {
    validateString(ext, 'ext')
    ext = formatExt(ext)
  }

  /**
   * File extension of {@linkcode path}.
   *
   * @const {EmptyString | Ext} extension
   */
  const extension: EmptyString | Ext = extname(path)

  path = removeExt(path, extension)

  if (!ext) return path
  return addExt(path, ext)
}

export default changeExt
