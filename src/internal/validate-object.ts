/**
 * @file Internal - validateObject
 * @module pathe/internal/validateObject
 */

import ERR_INVALID_ARG_TYPE from './err-invalid-arg-type'

/**
 * Checks if `value` is an object.
 *
 * **Note**: Array values are not considered objects.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @param {unknown} value - Value provided by user
 * @param {string} name - Name of invalid argument
 * @return {boolean} `true` if `value` is an object
 * @throws {TypeError} If `value` is not an object
 */
const validateObject = (value: unknown, name: string): boolean => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true
  }

  throw new ERR_INVALID_ARG_TYPE(name, 'object', value)
}

export default validateObject
