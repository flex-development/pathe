/**
 * @file Internal - validateString
 * @module pathe/internal/validateString
 */

import { ERR_INVALID_ARG_TYPE } from '@flex-development/errnode'
import { isString } from '@flex-development/tutils'

/**
 * Checks if `value` is a string.
 *
 * @internal
 *
 * @param {unknown} value - Value provided by user
 * @param {string} name - Name of invalid argument
 * @return {string} `value` if `value` is a string
 * @throws {TypeError} If `value` is not an object
 */
const validateString = (value: unknown, name: string): string => {
  if (isString(value)) return value
  throw new ERR_INVALID_ARG_TYPE(name, 'string', value)
}

export default validateString
