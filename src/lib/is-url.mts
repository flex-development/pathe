/**
 * @file isURL
 * @module pathe/lib/isURL
 */

import canParseURL from '#internal/can-parse-url'
import isURLObject from '#internal/is-url-object'

/**
 * Check if `value` is a {@linkcode URL} or can be parsed to a `URL`.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to check
 * @return {value is URL | string}
 *  `true` if `value` is a `URL` or can be parsed to a `URL`
 */
function isURL(this: void, value: unknown): value is URL | string {
  return isURLObject(value) || canParseURL(value)
}

export default isURL
