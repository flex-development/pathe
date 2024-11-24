/**
 * @file formatExt
 * @module pathe/lib/formatExt
 */

import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Format a file extension.
 *
 * @see {@linkcode EmptyString}
 * @see {@linkcode Ext}
 *
 * @example
 *  formatExt('') // ''
 * @example
 *  formatExt(null) // ''
 * @example
 *  formatExt('.ts ') // '.ts'
 * @example
 *  formatExt(' mjs') // '.mjs'
 * @example
 *  formatExt('d.mts') // '.d.mts'
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {string | null | undefined} ext
 *  The file extension to format
 * @return {EmptyString | Ext}
 *  Formatted file extension or empty string
 */
function formatExt(
  this: void,
  ext: string | null | undefined
): EmptyString | Ext {
  if (ext !== null && ext !== undefined) {
    validateString(ext, 'ext')
    ext = ext.trim()
  }

  if (!ext) return ''
  if (ext.startsWith(dot)) return ext as Ext
  return `${dot}${ext}`
}

export default formatExt
