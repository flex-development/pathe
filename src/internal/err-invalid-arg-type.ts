/**
 * @file Internal - ERR_INVALID_ARG_TYPE
 * @module pathe/internal/ERR_INVALID_ARG_TYPE
 */

import {
  createNodeError,
  determineSpecificType,
  ErrorCode,
  type MessageFn,
  type NodeError,
  type NodeErrorConstructor
} from '@flex-development/errnode'

/**
 * Creates an [`ERR_INVALID_ARG_TYPE`][1] message.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @param {string} name - Name of invalid argument or property
 * @param {string} expected - Expected type
 * @param {unknown} actual - Value supplied by user
 * @return {string} Error message
 */
const msg: MessageFn<[string, string, unknown]> = (
  name: string,
  expected: string,
  actual: unknown
): string => {
  return [
    `The "${name}" argument must be of type ${expected}.`,
    `Received ${determineSpecificType(actual)}`
  ].join(' ')
}

/**
 * [`ERR_INVALID_ARG_TYPE`][1] model.
 *
 * Thrown when an argument of the wrong type was passed to a Node.js API.
 *
 * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @class
 * @implements {NodeError<TypeError>}
 */
const ERR_INVALID_ARG_TYPE: NodeErrorConstructor<
  TypeErrorConstructor,
  typeof msg
> = createNodeError(ErrorCode.ERR_INVALID_ARG_TYPE, TypeError, msg)

export default ERR_INVALID_ARG_TYPE
