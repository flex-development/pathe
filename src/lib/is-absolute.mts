/**
 * @file isAbsolute
 * @module pathe/lib/isAbsolute
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import isSep from '#lib/is-sep'
import toPath from '#lib/to-path'

/**
 * Determine if `input` is absolute.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * @example
 *  isAbsolute('') // false
 * @example
 *  isAbsolute('../') // false
 * @example
 *  isAbsolute(cwd()) // true
 * @example
 *  isAbsolute(pathToFileURL(cwd())) // true
 * @example
 *  isAbsolute(new URL('node:path')) // false
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to check
 * @return {boolean}
 *  `true` if `input` is absolute, `false` otherwise
 */
function isAbsolute(this: void, input: URL | string): boolean {
  validateURLString(input, 'input')
  input = toPath(input)

  if (!input.length) return false
  if (isSep(input[0])) return true

  return input.length > 2 && DRIVE_PATH_REGEX.test(input) && isSep(input[2])
}

export default isAbsolute
