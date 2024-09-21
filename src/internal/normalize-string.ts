/**
 * @file Internal - normalizeString
 * @module pathe/internal/normalizeString
 */

import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import validateString from './validate-string'

/**
 * Normalize `path`.
 *
 * This includes:
 *
 * - Enforcing POSIX standards
 * - Resolving `'.'` (current directory) and `'..'` (parent directory) segments
 * - Deduplicating separators. Leading and trailing separators are **not**
 *   preserved
 *
 * @internal
 *
 * @param {string} path
 *  Path to normalize
 * @param {boolean} allowAboveRoot
 *  Normalize past root
 * @return {string}
 *  Normalized `path`
 */
function normalizeString(path: string, allowAboveRoot: boolean): string {
  validateString(path, 'path')
  path = toPosix(path)

  /**
   * Current character in {@link path}.
   *
   * @var {string | undefined} char
   */
  let char: string | undefined

  /**
   * Total number of `.` (dot) characters in current path segment.
   *
   * @var {number} dots
   */
  let dots: number = 0

  /**
   * Normalized {@linkcode path}.
   *
   * @var {string} res
   */
  let res: string = ''

  /**
   * Length of last seen path segment.
   *
   * @var {number} lastSegmentLength
   */
  let lastSegmentLength: number = 0

  /**
   * Index of last seen path separator.
   *
   * @var {number} lastSlash
   */
  let lastSlash: number = -1

  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) char = path[i]
    else if (isSep(char)) break
    else char = sep

    if (isSep(char)) {
      if (lastSlash === i - 1 || dots === 1) {
        // noop
      } else if (dots === 2) {
        if (
          res.length < 2 ||
          lastSegmentLength !== 2 ||
          !/(?:\..$)|(?:\.$)/.test(res)
        ) {
          if (res.length > 2) {
            /**
             * Index of last path separator in {@linkcode res}.
             *
             * @const {number} sepIdxRet
             */
            const sepIdxRet: number = res.lastIndexOf(sep)

            if (sepIdxRet === -1) {
              res = ''
              lastSegmentLength = 0
            } else {
              res = res.slice(0, sepIdxRet)
              lastSegmentLength = res.length - 1 - res.lastIndexOf(sep)
            }

            lastSlash = i
            dots = 0

            continue
          } else if (res.length > 0) {
            res = ''
            lastSlash = i
            lastSegmentLength = 0
            dots = 0

            continue
          }
        }

        if (allowAboveRoot) {
          res += `${!res ? '' : sep}${dot.repeat(2)}`
          lastSegmentLength = 2
        }
      } else {
        if (res.length > 0) {
          res += `${sep}${path.slice(lastSlash + 1, i)}`
        } else {
          res = path.slice(lastSlash + 1, i)
        }

        lastSegmentLength = i - lastSlash - 1
      }

      lastSlash = i
      dots = 0
    } else if (char === dot && dots !== -1) {
      ++dots
    } else {
      dots = -1
    }
  }

  return res
}

export default normalizeString
