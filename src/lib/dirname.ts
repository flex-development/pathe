/**
 * @file dirname
 * @module pathe/lib/dirname
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import isAbsolute from './is-absolute'
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
   * Drive path check.
   *
   * @const {boolean} drive
   */
  const drive: boolean = isDrivePath(path)

  /**
   * Leading path separator check.
   *
   * @const {boolean} root
   */
  const root: boolean = isSep(path.charAt(0))

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

  /**
   * UNC path check.
   *
   * @var {boolean} unc
   */
  let unc: boolean = false

  // adjust start index if path starts with drive letter
  if (drive) start = path.length > 2 && isAbsolute(path) ? 3 : 2

  // adjust start index if path is absolute
  if (isSep(path.charAt(0))) {
    // reset start index of directory name
    start = 1

    // adjust start and end indices if path is unc path
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
        // set last visited position to index of directory separator
        last = j

        // match 1 or more directory separators
        while (j < path.length && isSep(path.charAt(j))) j++

        if (j < path.length && j !== last) {
          // set last visited position to index of non-directory separator
          last = j

          // match 1 or more non-directory separators
          while (j < path.length && !isSep(path.charAt(j))) j++

          // matched unc root
          if (j === path.length) return path

          // matched unc root with leftovers
          // offset by 1 to include the separator after the root so that it is
          // treated as a "normal root" on top of a unc root
          if (j !== last) {
            unc = true
            end = start = j + 1
          }
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
      : drive
      ? path.slice(0, start)
      : DOT
    : root && end === 1
    ? sep + sep
    : path.slice(0, end)
}

export default dirname
