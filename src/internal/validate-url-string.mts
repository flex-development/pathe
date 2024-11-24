/**
 * @file Internal - validateURLString
 * @module pathe/internal/validateURLString
 */

import isURLObject from '#internal/is-url-object'
import {
  ERR_INVALID_ARG_TYPE,
  type ErrInvalidArgType
} from '@flex-development/errnode'

/**
 * Check if `value` is a {@linkcode URL} or string.
 *
 * @internal
 *
 * @param {unknown} value
 *  Value to check
 * @param {string} name
 *  Name of invalid argument or property
 * @return {value is URL | string}
 *  `true` if `value` is a `URL` or string
 * @throws {ErrInvalidArgType}
 *  If `value` is not a `URL` or string
 */
function validateURLString(
  value: unknown,
  name: string
): value is URL | string {
  if (isURLObject(value) || typeof value === 'string') return true
  throw new ERR_INVALID_ARG_TYPE(name, ['URL', 'string'], value)
}

export default validateURLString
