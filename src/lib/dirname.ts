/**
 * @file dirname
 * @module pathe/lib/dirname
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import { DOT, at, isEmptyString } from '@flex-development/tutils'
import isAbsolute from './is-absolute'
import sep from './sep'

/**
 * Returns the directory name of a `path`, similar to the Unix `dirname`
 * command.
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
  if (isEmptyString(path)) return DOT

  // ensure path meets posix standards
  path = ensurePosix(path)

  // exit early if path length equals 1
  if (path.length === 1) return isSep(path) ? path : DOT

  /**
   * Index to begin searching for directory name.
   *
   * @var {number} offset
   */
  let offset: number = 0

  /**
   * End index of {@linkcode path} root.
   *
   * @var {number} root_end
   */
  let root_end: number = -1

  // adjust offset if path is drive path
  if (isDrivePath(path)) {
    offset = root_end = path.length > 2 && isAbsolute(path) ? 3 : 2
  }

  // adjust offset if path is absolute
  if (isSep(at(path, 0))) {
    root_end = offset = 1

    // try adjusting offset if path is possible unc path
    if (isSep(at(path, 1))) {
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
      while (j < path.length && !isSep(at(path, j))) j++

      if (j < path.length && j !== last) {
        // set last visited position to index of directory separator
        last = j

        // match 1 or more directory separators
        while (j < path.length && isSep(at(path, j))) j++

        if (j < path.length && j !== last) {
          // set last visited position to index of non-directory separator
          last = j

          // match 1 or more non-directory separators
          while (j < path.length && !isSep(at(path, j))) j++

          // matched unc root
          if (j === path.length) return path

          // matched unc root with leftovers
          // offset by 1 to include the separator after the root so that it is
          // treated as a "normal root" on top of a unc root
          if (j !== last) root_end = offset = j + 1
        }
      }
    }
  }

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

  // get end index of directory name
  for (let i = path.length - 1; i >= offset; --i) {
    if (isSep(at(path, i))) {
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

  return end === -1 && root_end === -1
    ? DOT
    : isSep(at(path, 0)) && end === 1
    ? sep.repeat(2)
    : path.slice(0, end === -1 ? root_end : end)
}

export default dirname
