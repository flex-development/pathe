/**
 * @file isSep
 * @module pathe/lib/isSep
 */

import { sepWindows } from '#internal/constants'
import type { Sep } from '@flex-development/pathe'
import sep from './sep'

/**
 * Check if `value` is a path segment separator.
 *
 * @see {@linkcode Sep}
 *
 * @category
 *  utils
 *
 * @param {unknown} [value]
 *  Value to check
 * @return {value is Sep}
 *  `true` if `value` is path segment separator, `false` otherwise
 */
function isSep(value: unknown): value is Sep {
  return value === sep || value === sepWindows
}

export default isSep
