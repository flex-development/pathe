/**
 * @file normalize
 * @module pathe/lib/normalize
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import normalizeString from '#internal/normalize-string'
import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import isAbsolute from '#lib/is-absolute'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'

/**
 * Normalize `path`, resolving `'..'` and `'.'` segments.
 *
 * When multiple, sequential path segment separators are found, they are
 * replaced by a single instance of {@linkcode sep}. Trailing separators are
 * preserved.
 *
 * If `path` is a zero-length string, {@linkcode dot} is returned, representing
 * the current working directory.
 *
 * @category
 *  core
 *
 * @param {string} path
 *  Path to normalize
 * @return {string}
 *  Normalized `path`
 */
function normalize(path: string): string {
  validateString(path, 'path')

  if (!path.length) return dot
  path = toPosix(path)
  if (path.length === 1) return path

  /**
   * Absolute path check.
   *
   * @const {boolean} absolute
   */
  const absolute: boolean = isAbsolute(path)

  /**
   * Drive letter or UNC path component(s), if any.
   *
   * @var {string} device
   */
  let device: string = ''

  /**
   * End index of root.
   *
   * @var {number} rootEnd
   */
  let rootEnd: number = 0

  if (isSep(path[rootEnd])) {
    rootEnd = 1

    if (isSep(path[rootEnd])) {
      /**
       * Current position in {@linkcode path}.
       *
       * @var {number} j
       */
      let j: number = rootEnd + 1

      /**
       * Last visited position in {@linkcode path}.
       *
       * @var {number} last
       */
      let last: number = j

      // match 1 or more non-path separators
      while (j < path.length && !isSep(path[j])) j++

      if (j < path.length && j !== last) {
        /**
         * Possible UNC path component.
         *
         * @const {string} host
         */
        const host: string = path.slice(last, j)

        // matched!
        last = j

        // match 1 or more path separators
        while (j < path.length && isSep(path[j])) j++

        if (j < path.length && j !== last) {
          // matched!
          last = j

          // match 1 or more non-path separators
          while (j < path.length && !isSep(path[j])) j++

          // matched unc root only
          if (j === path.length) {
            return `${sep}${sep}${host}${sep}${path.slice(last)}${sep}`
          }

          // matched unc root with leftovers
          if (j !== last) {
            device = `${sep}${sep}${host}${sep}${path.slice(last, j)}`
            rootEnd = j
          }
        }
      }
    }
  } else if (DRIVE_PATH_REGEX.test(path)) {
    device = path.slice(0, rootEnd = 2)
    if (absolute) rootEnd++
  }

  /**
   * Tail end of normalized path.
   *
   * @var {string} tail
   */
  let tail: string = rootEnd < path.length
    ? normalizeString(path.slice(rootEnd), !absolute)
    : ''

  if (!tail.length && !absolute) tail = dot
  if (tail.length && isSep(path[path.length - 1])) tail += sep

  return `${device}${absolute ? sep : ''}${tail}`
}

export default normalize
