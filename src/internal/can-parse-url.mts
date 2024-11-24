/**
 * @file Internal - canParseURL
 * @module pathe/internal/canParseURL
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'

/**
 * Check if `value` can be parsed to a {@linkcode URL}.
 *
 * @internal
 *
 * @param {unknown} value
 *  The value to check
 * @return {boolean}
 *  `true` if `value` can be parsed to a `URL`
 */
function canParseURL(value: unknown): boolean {
  try {
    new URL(value as URL | string)
    return !(typeof value === 'string' && DRIVE_PATH_REGEX.test(value))
  } catch {
    return false
  }
}

export default canParseURL
