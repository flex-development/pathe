/**
 * @file toPosix
 * @module pathe/lib/toPosix
 */

import validateString from '#internal/validate-string'
import sep from '#lib/sep'

/**
 * Make separators in `path` POSIX-compliant.
 *
 * @category
 *  utils
 *
 * @param {string} path
 *  Path to handle
 * @return {string}
 *  `path` with POSIX-compliant separators
 */
function toPosix(path: string): string {
  validateString(path, 'path')
  return path.replace(/\\/g, sep)
}

export default toPosix
