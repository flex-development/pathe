/**
 * @file toPath
 * @module pathe/lib/toPath
 */

import canParseURL from '#internal/can-parse-url'
import validateURLString from '#internal/validate-url-string'
import fileURLToPath from '#lib/file-url-to-path'
import type { ToPathOptions } from '@flex-development/pathe'

export default toPath

/**
 * Convert `input` to a path.
 *
 * @see {@linkcode ToPathOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to convert
 * @param {ToPathOptions | null | undefined} [options]
 *  Conversion options
 * @return {string}
 *  `input` as path
 */
function toPath(
  this: void,
  input: URL | string,
  options?: ToPathOptions | null | undefined
): string

/**
 * Convert a list of inputs to paths.
 *
 * @see {@linkcode ToPathOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {ReadonlyArray<URL | string>} list
 *  The list of {@linkcode URL}s, URL strings, or paths to convert
 * @param {ToPathOptions | null | undefined} [options]
 *  Conversion options
 * @return {string[]}
 *  List of paths
 */
function toPath(
  this: void,
  list: readonly (URL | string)[],
  options?: ToPathOptions | null | undefined
): string[]

/**
 * Convert inputs to paths.
 *
 * @see {@linkcode ToPathOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {ReadonlyArray<URL | string> | URL | string} value
 *  The {@linkcode URL}, URL string, or path to convert, or list of such values
 * @param {ToPathOptions | null | undefined} [options]
 *  Conversion options
 * @return {string[] | string}
 *  `value` as path or new list of paths
 */
function toPath(
  this: void,
  value: readonly (URL | string)[] | URL | string,
  options?: ToPathOptions | null | undefined
): string[] | string

/**
 * @this {void}
 *
 * @param {ReadonlyArray<URL | string> | URL | string} value
 *  The {@linkcode URL}, URL string, or path to convert, or list of such values
 * @param {ToPathOptions | null | undefined} [options]
 *  Conversion options
 * @return {string[] | string}
 *  `value` as path or new list of paths
 */
function toPath(
  this: void,
  value: readonly (URL | string)[] | URL | string,
  options?: ToPathOptions | null | undefined
): string[] | string {
  if (Array.isArray<URL | string>(value)) {
    return value.map((input, i) => {
      return validateURLString(input, `value[${i}]`), toPath(input)
    })
  }

  validateURLString(value, 'input')

  if (typeof value === 'string') {
    if (!canParseURL(value)) return value
    value = new URL(value)
  }

  if (value.protocol === 'file:') return fileURLToPath(value, options)

  return value.pathname
}
