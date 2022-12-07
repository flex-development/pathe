/**
 * @file Internal - ERR_INVALID_ARG_TYPE
 * @module pathe/internal/ERR_INVALID_ARG_TYPE
 */

import { inspect } from 'node-inspect-extracted'
import NodeError from './node-error'

/**
 * Invalid argument type error model.
 *
 * @see https://nodejs.org/api/errors.html#err_invalid_arg_type
 *
 * @class
 * @extends {NodeError}
 */
class ERR_INVALID_ARG_TYPE extends NodeError {
  /**
   * Creates an [invalid argument type error][1].
   *
   * [1]: https://nodejs.org/api/errors.html#err_invalid_arg_type
   *
   * @param {string} name - Name of invalid argument
   * @param {string} type - Expected argument type
   * @param {unknown} value - Value passed by user
   */
  constructor(name: string, type: string, value: unknown) {
    super('TypeError', 'ERR_INVALID_ARG_TYPE')

    this.message = `The "${name}" argument must be of type ${type}.`
    this.message += ` Received ${this.determineSpecificType(value)}`
  }

  /**
   * Determines the specific type of a value.
   *
   * @protected
   *
   * @param {unknown} value - Value to detect type of
   * @return {string} Specific type of `value`
   */
  protected determineSpecificType(value: unknown): string {
    /**
     * Specific type of `value`.
     *
     * @var {string} type
     */
    let type: string = ''

    switch (true) {
      case typeof value === 'function':
        type = `function ${(value as FunctionConstructor).name}`
        break
      case typeof value === 'object':
        type = value?.constructor?.name
          ? `an instance of ${value.constructor.name}`
          : inspect(value, { depth: -1 })
        break
      case typeof value === 'undefined':
        type = typeof value
        break
      default:
        /**
         * String representation of {@linkcode value}.
         *
         * @var {string} inspected
         */
        let inspected: string = inspect(value, { colors: false })

        // trim string representation of value
        if (inspected.length > 28) inspected = inspected.slice(0, 25) + '...'

        type = `type ${typeof value} (${inspected})`
        break
    }

    return type
  }
}

export default ERR_INVALID_ARG_TYPE
