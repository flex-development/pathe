/**
 * @file Internal - validateString
 * @module pathe/internal/validateString
 */

import ERR_INVALID_ARG_TYPE from './err-invalid-arg-type'

/**
 * Checks if `value` is a string.
 *
 * Throws {@linkcode ERR_INVALID_ARG_TYPE} if `value` is not a string.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @param {unknown} value - Possible string value
 * @param {string} name - `value` label
 * @return {string} `value` if `value` is a string
 * @throws {ERR_INVALID_ARG_TYPE}
 */
const validateString = (value: unknown, name: string): string => {
  if (typeof value === 'string') return value
  throw new ERR_INVALID_ARG_TYPE(name, 'string', value)
}

export default validateString
