/**
 * @file Internal - validateString
 * @module pathe/internal/validateString
 */

import {
  ERR_INVALID_ARG_TYPE,
  type ErrInvalidArgType
} from '@flex-development/errnode'

/**
 * Check if `value` is a string.
 *
 * @internal
 *
 * @param {unknown} value
 *  Value to check
 * @param {string} name
 *  Name of invalid argument or property
 * @return {value is string}
 *  `true` if `value` is a string
 * @throws {ErrInvalidArgType}
 *  If `value` is not a string
 */
function validateString(value: unknown, name: string): value is string {
  if (typeof value === 'string') return true
  throw new ERR_INVALID_ARG_TYPE(name, 'string', value)
}

export default validateString
