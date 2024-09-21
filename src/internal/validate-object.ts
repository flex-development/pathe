/**
 * @file Internal - validateObject
 * @module pathe/internal/validateObject
 */

import {
  ERR_INVALID_ARG_TYPE,
  type ErrInvalidArgType
} from '@flex-development/errnode'

/**
 * Check if `value` is a curly-braced object.
 *
 * @internal
 *
 * @template {Record<string, unknown>} T - Object type
 *
 * @param {unknown} value
 *  Value to check
 * @param {string} name
 *  Name of invalid argument or property
 * @return {value is T}
 *  `true` if `value` is curly-braced object, `false` otherwise
 * @throws {ErrInvalidArgType}
 *  If `value` is not curly-braced object
 */
function validateObject<T extends Record<string, unknown>>(
  value: unknown,
  name: string
): value is T {
  if (typeof value === 'object' && !Array.isArray(value) && value) return true
  throw new ERR_INVALID_ARG_TYPE(name, 'Object', value)
}

export default validateObject
