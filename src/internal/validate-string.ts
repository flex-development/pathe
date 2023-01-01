/**
 * @file Internal - validateString
 * @module pathe/internal/validateString
 */

import { ERR_INVALID_ARG_TYPE } from '@flex-development/errnode'

/**
 * Checks if `value` is a string.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @param {unknown} value - Value provided by user
 * @param {string} name - Name of invalid argument
 * @return {string} `value` if `value` is a string
 * @throws {TypeError} If `value` is not an object
 */
const validateString = (value: unknown, name: string): string => {
  if (typeof value === 'string') return value
  throw new ERR_INVALID_ARG_TYPE(name, 'string', value)
}

export default validateString
