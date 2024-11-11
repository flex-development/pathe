/**
 * @file dirname
 * @module pathe/lib/dirname
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import delimiter from '#lib/delimiter'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'

/**
 * Get the directory name of `path`, similar to the Unix `dirname` command.
 *
 * Trailing [directory separators][sep] are ignored.
 *
 * [sep]: https://nodejs.org/api/path.html#pathsep
 *
 * @category
 *  core
 *
 * @param {string} path
 *  Path to handle
 * @return {string}
 *  Directory name of `path`
 */
function dirname(path: string): string {
  validateString(path, 'path')
  path = toPosix(path)

  if (!path.length) return dot
  if (path.length === 1) return isSep(path) ? path : dot

  /**
   * Index to begin searching for directory name.
   *
   * @var {number} offset
   */
  let offset: number = 0

  /**
   * End index of root.
   *
   * @var {number} rootEnd
   */
  let rootEnd: number = -1

  if (isSep(path[offset])) {
    rootEnd = offset = 1

    if (isSep(path[offset])) {
      /**
       * Current position in {@linkcode path}.
       *
       * @var {number} j
       */
      let j: number = offset + 1

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
          if (j === path.length) return path

          // matched UNC root with leftovers.
          // offset by 1 to include the separator after the UNC root to
          // treat it as a "normal root" on top of a (UNC) root
          if (j !== last) rootEnd = offset = j + 1
        }
      }
    }
  } else if (DRIVE_PATH_REGEX.test(path)) {
    /**
     * Index of character after colon (`:`).
     *
     * @const {number} afterColon
     */
    const afterColon: number = path.indexOf(delimiter, offset) + 1

    rootEnd = offset = path.length > 2 && isSep(path[afterColon])
      ? afterColon + 1
      : afterColon
  }

  /**
   * End index of directory name.
   *
   * @var {number} end
   */
  let end: number = -1

  /**
   * Boolean indicating a path separator was seen.
   *
   * @var {boolean} separator
   */
  let separator: boolean = true

  for (let i = path.length - 1; i >= offset; --i) {
    if (isSep(path[i])) {
      if (!separator) {
        end = i
        break
      }
    } else {
      // reached first character that is not a path separator
      separator = false
    }
  }

  return end === -1 && rootEnd === -1
    ? dot
    : path[0] === sep && end === 1
    ? sep + sep
    : path.slice(0, end === -1 ? rootEnd : end)
}

export default dirname
