/**
 * @file root
 * @module pathe/lib/root
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import delimiter from '#lib/delimiter'
import isSep from '#lib/is-sep'
import toPosix from '#lib/to-posix'

/**
 * Get the root of `path`.
 *
 * @category
 *  utils
 *
 * @param {string} path
 *  The path to handle
 * @return {string}
 *  Root of `path`
 */
function root(path: string): string {
  validateString(path, 'path')

  if (!path.length) return path
  path = toPosix(path)

  // `path` is just a separator, exit early to avoid unnecessary work
  if (path.length === 1 && isSep(path)) return path

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
        last = j

        // match 1 or more path separators
        while (j < path.length && isSep(path[j])) j++

        if (j < path.length && j !== last) {
          last = j

          // match 1 or more non-path separators
          while (j < path.length && !isSep(path[j])) j++

          // matched UNC root only
          if (j === path.length) rootEnd = j
          // matched UNC root with leftovers.
          // offset by 1 to include the separator after the UNC root to
          // treat it as a "normal root" on top of a (UNC) root
          else if (j !== last) rootEnd = j + 1
        }
      }
    }
  } else if (DRIVE_PATH_REGEX.test(path)) {
    rootEnd = path.indexOf(delimiter) + 1

    // `path` is just a drive root, exit early to avoid unnecessary work
    if (path.length <= rootEnd) return path

    if (isSep(path[rootEnd])) {
      rootEnd++

      // `path` is just a device root, exit early to avoid unnecessary work
      if (path.length === rootEnd) return path
    }
  }

  return rootEnd ? path.slice(0, rootEnd) : ''
}

export default root
