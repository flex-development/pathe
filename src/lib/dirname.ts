/**
 * @file dirname
 * @module pathe/lib/dirname
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import isUncPath from '#src/internal/is-unc-path'
import validateString from '#src/internal/validate-string'
import sep from './sep'

/**
 * Returns the directory name of a path, similar to the Unix `dirname` command.
 *
 * Trailing [directory separators][1] are ignored.
 *
 * [1]: https://nodejs.org/api/path.html#pathsep
 *
 * @param {string} path - Path to evaluate
 * @return {string} Directory name of `path`
 * @throws {TypeError} If `path` is not a string
 */
const dirname = (path: string): string => {
  validateString(path, 'path')

  // exit early if path is empty string
  if (path.length === 0) return DOT

  // ensure path meets posix standards
  path = ensurePosix(path)

  // exit early if path length equals 1
  if (path.length === 1) return isSep(path) ? path : DOT

  /**
   * UNC path check.
   *
   * @const {boolean} unc
   */
  const unc: boolean = isUncPath(path)

  /**
   * Leading path separator check.
   *
   * @const {boolean} root
   */
  const root: boolean = isSep(path[0])

  /**
   * Start index of directory name.
   *
   * @var {number} start
   */
  let start: number = root ? 1 : 0

  /**
   * End index of directory name.
   *
   * @var {number} end
   */
  let end: number = -1

  /**
   * Directory separator match check.
   *
   * @var {boolean} sep_match
   */
  let sep_match: boolean = true

  // adjust start index if path starts with drive letter
  if (isDrivePath(path)) {
    start = path.length > 2 && isSep(path.charAt(2)) ? 3 : 2
  }

  // adjust start index if path is unc path
  if (unc) {
    // reset start index of directory name
    start = 1

    // match unc roots
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

      // match 1 or more non-directory separators
      while (j < path.length && !isSep(path.charAt(j))) j++

      if (j < path.length && j !== last) {
        // set index of non-directory separator match
        last = j

        // match 1 or more directory separators
        while (j < path.length && isSep(path.charAt(j))) j++

        if (j < path.length && j !== last) {
          // set index of separator match
          last = j

          // match 1 or more non-directory separators
          while (j < path.length && !isSep(path.charAt(j))) j++

          // matched unc root
          if (j === path.length) return path

          // matched unc root with leftovers
          // offset by 1 to include the separator after the root so that it is
          // treated as a "normal root" on top of a unc root
          if (j !== last) end = start = j + 1
        }
      }
    }
  }

  // get end index of directory name
  for (let i = path.length - 1; i >= start; --i) {
    if (isSep(path.charAt(i))) {
      // set end index of directory name
      if (!sep_match) {
        end = i
        break
      }
    } else {
      // non-directory separator was encountered
      sep_match = false
    }
  }

  return end === -1
    ? root && !unc
      ? sep
      : isDrivePath(path)
      ? path.length <= 3
        ? path
        : path.slice(0, start)
      : DOT
    : root && end === 1
    ? sep + sep
    : path.slice(0, end)
}

export default dirname
