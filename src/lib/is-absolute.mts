/**
 * @file isAbsolute
 * @module pathe/lib/isAbsolute
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import isSep from '#lib/is-sep'

/**
 * Determine if `path` is absolute.
 *
 * @example
 *  isAbsolute('') // false
 * @example
 *  isAbsolute('../') // false
 * @example
 *  isAbsolute(cwd()) // true
 * @example
 *  isAbsolute(toPath(new URL('node:path'))) // false
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {string} path
 *  The path to check
 * @return {boolean}
 *  `true` if `path` is absolute, `false` otherwise
 */
function isAbsolute(this: void, path: string): boolean {
  validateString(path, 'path')
  if (!path.length) return false
  if (isSep(path[0])) return true
  return path.length > 2 && DRIVE_PATH_REGEX.test(path) && isSep(path[2])
}

export default isAbsolute
