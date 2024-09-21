/**
 * @file toPosix
 * @module pathe/lib/toPosix
 */

import validateString from '#internal/validate-string'
import delimiter from './delimiter'
import sep from './sep'

/**
 * Make `path` POSIX-compliant.
 *
 * This includes:
 *
 * - Converting Windows-style path delimiters (`;`) to POSIX (`:`)
 * - Converting Windows-style path segment separators (`\`) to POSIX (`/`)
 *
 * @see https://nodejs.org/api/path.html#windows-vs-posix
 * @see https://nodejs.org/api/path.html#pathdelimiter
 * @see https://nodejs.org/api/path.html#pathsep
 *
 * @category
 *  utils
 *
 * @param {string} path
 *  Path to handle
 * @return {string}
 *  POSIX-compliant `path`
 */
function toPosix(path: string): string {
  validateString(path, 'path')
  return path.replace(/;/g, delimiter).replace(/\\/g, sep)
}

export default toPosix
