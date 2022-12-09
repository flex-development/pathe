/**
 * @file isAbsolute
 * @module pathe/lib/isAbsolute
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'

/**
 * Determines if a path is an absolute path.
 *
 * @param {string} path - Path to evaluate
 * @return {boolean} `true` if `path` is absolute
 * @throws {TypeError} If `path` is not a string
 */
const isAbsolute = (path: string): boolean => {
  validateString(path, 'path')

  // exit early if path is empty string
  if (path.length === 0) return false

  // ensure path meets posix standards
  path = ensurePosix(path)

  return isSep(path.charAt(0)) || (isDrivePath(path) && isSep(path.charAt(2)))
}

export default isAbsolute
