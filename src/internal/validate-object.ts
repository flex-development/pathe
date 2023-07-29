/**
 * @file Internal - validateObject
 * @module pathe/internal/validateObject
 */

import { ERR_INVALID_ARG_TYPE } from '@flex-development/errnode'
import { isObjectCurly } from '@flex-development/tutils'

/**
 * Checks if `value` is a curly-braced object.
 *
 * @see {@linkcode isObjectCurly}
 *
 * @internal
 *
 * @param {unknown} value - Value provided by user
 * @param {string} name - Name of invalid argument
 * @return {boolean} `true` if `value` is an object
 * @throws {TypeError} If `value` is not an object
 */
const validateObject = (value: unknown, name: string): boolean => {
  if (isObjectCurly(value)) return true
  throw new ERR_INVALID_ARG_TYPE(name, 'object', value)
}

export default validateObject
