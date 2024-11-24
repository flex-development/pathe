/**
 * @file toPosix
 * @module pathe/lib/toPosix
 */

import validateURLString from '#internal/validate-url-string'
import sep from '#lib/sep'

export default toPosix

/**
 * Make separators in `input` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @template {URL | string} Input
 *  The URL or path to handle
 *
 * @this {void}
 *
 * @param {Input} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @return {Input}
 *  `input` with POSIX-compliant separators
 */
function toPosix<Input extends URL | string>(this: void, input: Input): Input

/**
 * Make separators in `list` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @template {(URL | string)[]} List
 *  The list to handle
 *
 * @this {void}
 *
 * @param {List} list
 *  The list of {@linkcode URL}s, URL strings, or paths to handle
 * @return {List}
 *  `list` with POSIX-compliant separators
 */
function toPosix<List extends (URL | string)[]>(this: void, list: List): List

/**
 * Make separators in `value` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @template {URL | string} Input
 *  The URL or path to handle
 *
 * @this {void}
 *
 * @param {Input | Input[]} value
 *  The {@linkcode URL}, URL string, or path to handle, or list of such values
 * @return {Input | Input[]}
 *  `value` with POSIX-compliant separators
 */
function toPosix<Input extends URL | string>(
  this: void,
  value: Input | Input[]
): Input | Input[]

/**
 * @this {void}
 *
 * @param {(URL | string)[] | URL | string} value
 *  The {@linkcode URL}, URL string, or path to handle, or list of such values
 * @return {(URL | string)[] | URL | string}
 *  `value` with POSIX-compliant separators
 */
function toPosix(
  this: void,
  value: (URL | string)[] | URL | string
): (URL | string)[] | URL | string {
  if (Array.isArray<URL | string>(value)) {
    /**
     * Current index in {@linkcode value}.
     *
     * @var {number} i
     */
    let i: number = -1

    while (++i < value.length) {
      /**
       * The URL, URL string, or path to handle.
       *
       * @const {URL | string} input
       */
      const input: URL | string = value[i]!

      validateURLString(input, `value[${i}]`)
      value[i] = toPosix(input)
    }

    return value
  }

  validateURLString(value, 'value')

  if (typeof value === 'string') {
    return value.replace(/\\/g, sep)
      .replace(/(?:%5C)/g, '%2F')
      .replace(/(?:%5c)/g, '%2f')
  }

  return value.href = toPosix(value.href), value
}
