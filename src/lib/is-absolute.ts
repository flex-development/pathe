/**
 * @file isAbsolute
 * @module pathe/lib/isAbsolute
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import { at, isEmptyString } from '@flex-development/tutils'

/**
 * Determines if `path` is an absolute path.
 *
 * If the given `path` is a zero-length string, `false` will be returned.
 *
 * @param {string} path - Path to evaluate
 * @return {boolean} `true` if `path` is absolute, `false` otherwise
 * @throws {TypeError} If `path` is not a string
 */
const isAbsolute = (path: string): boolean => {
  validateString(path, 'path')

  // exit early if path is empty string
  if (isEmptyString(path)) return false

  // ensure path meets posix standards
  path = ensurePosix(path)

  return isSep(at(path, 0)) || (isDrivePath(path) && isSep(at(path, 2)))
}

export default isAbsolute
