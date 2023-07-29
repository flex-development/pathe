/**
 * @file Utilities - formatExt
 * @module pathe/utils/formatExt
 */

import type { Ext } from '#src/types'
import { cast, trim, type EmptyString } from '@flex-development/tutils'

/**
 * Formats a file extension.
 *
 * This includes:
 *
 * - Prepending a `.` (dot) character if not already present
 *
 * Does nothing if a file extension isn't provided.
 *
 * @example
 *  formatExt() // ''
 * @example
 *  formatExt('') // ''
 * @example
 *  formatExt('.ts') // '.ts'
 * @example
 *  formatExt('mjs') // '.mjs'
 * @example
 *  formatExt('d.mts') // '.d.mts'
 *
 * @param {string} [ext=''] - File extension to format
 * @return {EmptyString | Ext} Formatted file extension or empty string
 */
const formatExt = (ext: string = ''): EmptyString | Ext => {
  return cast(trim(ext).replace(/^([^.])/, '.$1'))
}

export default formatExt
