/**
 * @file Internal - NodeError
 * @module pathe/internal/NodeError
 */

/**
 * Node.js error model.
 *
 * @class
 * @extends {Error}
 */
class NodeError extends Error {
  /**
   * Error code.
   *
   * @see https://nodejs.org/api/errors.html#nodejs-error-codes
   *
   * @public
   * @readonly
   * @member {string} code
   */
  public readonly code: string

  /**
   * @public
   * @override
   * @member {string} name - Error name
   */
  public override name: string

  /**
   * Creates a new Node.js error.
   *
   * @param {string} name - Error class name
   * @param {string} code - Error code
   * @param {string} [message] - Error message
   */
  constructor(name: string, code: string, message?: string) {
    super(message)
    this.code = code
    this.name = `${name} [${this.code}]`
    Error.captureStackTrace(this)
  }
}

export default NodeError
