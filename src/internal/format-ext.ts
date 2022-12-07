/**
 * @file Internal - formatExt
 * @module pathe/internal/formatExt
 */

import type { Ext } from '#src/types'
import validateString from './validate-string'

/**
 * File extension formatter.
 *
 * @param {string} ext - File extension to format
 * @return {Ext} `ext` formatted
 */
const formatExt = (ext: string): Ext => {
  validateString(ext, 'ext')
  return ext.replace(/^([^.])/, '.$1') as Ext
}

export default formatExt
