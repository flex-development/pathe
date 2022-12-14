/**
 * @file normalize
 * @module pathe/lib/normalize
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import normalizeString from '#src/internal/normalize-string'
import validateString from '#src/internal/validate-string'
import isAbsolute from './is-absolute'
import sep from './sep'

/**
 * Normalizes the given `path`, resolving `'..'` and `'.'` segments.
 *
 * When multiple, sequential path segment separation characters are found (e.g.
 * `/` on POSIX and either `\\` or `/` on Windows), they are replaced by a
 * single instance of a POSIX-compliant separator. Trailing separators are
 * preserved.
 *
 * If the `path` is a zero-length string, `'.'` is returned, representing the
 * current working directory.
 *
 * @param {string} path - Path to normalize
 * @return {string} Normalized `path`
 * @throws {TypeError} If `path` is not a string
 */
const normalize = (path: string): string => {
  validateString(path, 'path')

  // exit early if path is empty string
  if (path.length === 0) return DOT

  // ensure path meets posix standards
  path = ensurePosix(path)

  // exit early if path is one character
  if (path.length === 1) return path

  /**
   * Absolute path check.
   *
   * @const {boolean} absolute
   */
  let absolute: boolean = false

  /**
   * Drive letter or UNC path component(s), if any.
   *
   * @var {string} device
   */
  let device: string = ''

  /**
   * Index to begin path normalization.
   *
   * @var {number} offset
   */
  let offset: number = 0

  // adjust normalization offset if path is drive path
  if (isDrivePath(path)) {
    device = path.slice(0, (offset = 2))

    if (path.length > 2 && isAbsolute(path)) {
      absolute = true
      offset = 3
    }
  }

  // adjust normalization offset if path is absolute
  if (isSep(path.charAt(0))) {
    absolute = true
    offset = 1

    // try adjusting normalization offset again if path is possible unc path
    if (isSep(path.charAt(1))) {
      /**
       * Current position in {@linkcode path}.
       *
       * @var {number} j
       */
      let j: number = 2

      /**
       * Last visited position in {@linkcode path}.
       *
       * @var {number} last
       */
      let last: number = j

      // match 1 or more non-path separators
      while (j < path.length && !isSep(path.charAt(j))) j++

      if (j < path.length && j !== last) {
        /**
         * Possible UNC path component.
         *
         * @const {string} host
         */
        const host: string = path.slice(last, j)

        // set last visited position to end of host
        last = j

        // match 1 or more path separators
        while (j < path.length && isSep(path.charAt(j))) j++

        if (j < path.length && j !== last) {
          // set last visited position
          last = j

          // match 1 or more non-path separators
          while (j < path.length && !isSep(path.charAt(j))) j++

          // matched unc root only => nothing left to process
          if (j === path.length) {
            return `${sep.repeat(2)}${host}${sep}${path.slice(last)}${sep}`
          }

          // matched unc root with leftovers
          if (j !== last) {
            device = `${sep.repeat(2)}${host}${sep}${path.slice(last, j)}`
            offset = j
          }
        }
      }
    }
  }

  /**
   * Tail end of normalized path.
   *
   * @var {string} tail
   */
  let tail: string =
    offset < path.length ? normalizeString(path.slice(offset), !absolute) : ''

  // set tail to cwd reference if tail is empty string and path is relative
  if (tail.length === 0 && !absolute) tail = DOT

  // re-add trailing separator
  if (tail.length > 0 && isSep(path.charAt(path.length - 1))) tail += sep

  return `${device}${absolute ? sep : ''}${tail}`
}

export default normalize
