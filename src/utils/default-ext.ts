/**
 * @file Utilities - defaultExt
 * @module pathe/utils/defaultExt
 */

import validateString from '#src/internal/validate-string'
import extname from '#src/lib/extname'
import type { Ext } from '#src/types'
import type { EmptyString, Nullable } from '@flex-development/tutils'
import addExt from './add-ext'
import formatExt from './format-ext'

/**
 * Appends a file extension to the given `path` if and only if the path does not
 * already have an extension. Force adding an extension can be accomplished by
 * passing an array of extensions to ignore.
 *
 * Does nothing if a file extension isn't provided.
 *
 * @example
 *  defaultExt('file') // 'file'
 * @example
 *  defaultExt('file', 'mjs') // 'file.mjs'
 * @example
 *  defaultExt('file', '.mjs') // 'file.mjs'
 * @example
 *  defaultExt('file.mjs', '.mjs') // 'file.mjs'
 * @example
 *  defaultExt('file.d', '.mts', ['.d']) // 'file.d.mts'
 *
 * @param {string} path - Path to evaluate
 * @param {Nullable<string>} [ext] - Default file extension
 * @param {string[]} [ignore] - File extensions to ignore if found
 * @return {string} `path` unmodified or with `ext` appended
 * @throws {TypeError} If `path` is not a string or `ext` is not a string
 */
const defaultExt = (
  path: string,
  ext?: Nullable<string>,
  ignore?: string[]
): string => {
  validateString(path, 'path')

  // exit early if extension isn't provided
  if (ext === null || ext === undefined) return path
  // validate file extension
  else validateString(ext, 'ext')

  // exit early if extension is empty string
  if (!ext.trim()) return path

  // validate ignorable extensions
  ignore = ignore
    ? ignore
        .map(ignorable => {
          try {
            validateString(ignorable, 'ignore[i]')
            return formatExt(ignorable.trim())
          } catch {
            return ''
          }
        })
        .filter(ignorable => ignorable.trim().length > 0)
    : []

  // ensure path does not end with dot character
  path = path.replace(/\.$/, '')

  /**
   * File extension of {@linkcode path}.
   *
   * @const {EmptyString | Ext} extension
   */
  const extension: EmptyString | Ext = extname(path)

  return extension && !ignore.includes(extension) ? path : addExt(path, ext)
}

export default defaultExt
