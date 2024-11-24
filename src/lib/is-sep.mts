/**
 * @file isSep
 * @module pathe/lib/isSep
 */

import { sepWindows } from '#internal/constants'
import sep from '#lib/sep'
import type { Sep } from '@flex-development/pathe'

/**
 * Check if `value` is a path segment separator.
 *
 * @see {@linkcode Sep}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to check
 * @return {value is Sep}
 *  `true` if `value` is path segment separator, `false` otherwise
 */
function isSep(this: void, value: unknown): value is Sep {
  return value === sep || value === sepWindows
}

export default isSep
