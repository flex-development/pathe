/**
 * @file Utilities - formatExt
 * @module pathe/utils/formatExt
 */

import type { Ext } from '#src/types'
import type { EmptyString } from '@flex-development/tutils'

/**
 * Formats a file extension.
 *
 * This includes:
 *
 * - Prepending a `.` (dot) character if not already present
 *
 * Does nothing if a file extension isn't provided.
 *
 * @param {string} [ext=''] - File extension to format
 * @return {EmptyString | Ext} Formatted file extension or empty string
 */
const formatExt = (ext: string = ''): EmptyString | Ext => {
  return ext.trim().replace(/^([^.])/, '.$1') as EmptyString | Ext
}

export default formatExt
