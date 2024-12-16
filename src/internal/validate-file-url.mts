/**
 * @file Internal - validateFileURL
 * @module pathe/internal/validateFileURL
 */

import validateURLString from '#internal/validate-url-string'
import {
  ERR_INVALID_URL_SCHEME,
  type ErrInvalidArgType,
  type ErrInvalidUrlScheme
} from '@flex-development/errnode'

/**
 * Check if `value` is a `file:` {@linkcode URL} object or string.
 *
 * @internal
 *
 * @param {unknown} value
 *  Value to check
 * @param {string} name
 *  Name of invalid argument or property
 * @return {value is URL | string}
 *  `true` if `value` is `file:` URL object or string
 * @throws {ErrInvalidArgType}
 *  If `value` is not `URL` object or string
 * @throws {ErrInvalidUrlScheme}
 *  If `value` is not a `file:` URL object or string
 */
function validateFileURL(
  value: unknown,
  name: string
): value is URL | string {
  validateURLString(value, name)
  if (String(value).startsWith('file:')) return true
  throw new ERR_INVALID_URL_SCHEME('file')
}

export default validateFileURL
