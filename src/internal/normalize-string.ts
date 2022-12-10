/**
 * @file Internal - normalizeString
 * @module pathe/internal/normalizeString
 */

import isAbsolute from '#src/lib/is-absolute'
import sep from '#src/lib/sep'
import { DOT } from './constants'
import ensurePosix from './ensure-posix'
import isSep from './is-sep'
import validateString from './validate-string'

/**
 * Normalizes a path.
 *
 * This includes:
 *
 * - Enforcing POSIX standards
 * - Resolving `'.'` (current directory) and `'..'` (parent directory) segments
 * - Deduplicating [separators][1]. Leading and trailing separators are **not**
 *   preserved
 *
 * [1]: {@link ../lib/sep.ts}
 *
 * @param {string} path - Path to normalize
 * @return {string} Normalized `path`
 * @throws {TypeError} If `path` is not a string
 */
const normalizeString = (path: string): string => {
  validateString(path, 'path')

  // exit early if path is empty string
  if (path.trim().length === 0) return path

  // ensure path meets posix standards
  path = ensurePosix(path)

  // exit early if path does not contain dot characters or separators
  if (!path.includes(DOT) && !path.includes(sep)) return path

  /**
   * Absolute path check.
   *
   * @const {boolean} absolute
   */
  const absolute: boolean = isAbsolute(path)

  /**
   * Current character in {@link path} being processed.
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
   * Last path segment length.
   *
   * @var {number} seglen
   */
  let seglen: number = 0

  /**
   * Last path separator index.
   *
   * @var {number} sepidx
   */
  let sepidx: number = -1

  // normalize
  for (let i = 0; i <= path.length; ++i) {
    // set current character if current index is in bounds
    if (i < path.length) char = path[i]
    // exit if trailing separator has been reached
    else if (isSep(char)) break
    // add trailing separator
    else char = sep

    // start or end segment
    if (isSep(char)) {
      if (sepidx === i - 1 || dots === 1) {
        // noop: leading or duplicate separator, or segment with 1 dot character
      } else if (dots === 2) {
        // resolve ".." segment
        if (res.length < 2 || seglen !== 2 || !/(?:\..$)|(?:\.$)/.test(res)) {
          if (res.length > 2) {
            /**
             * Index of last path separator in {@linkcode res}.
             *
             * @const {number} sepidx_res
             */
            const sepidx_res: number = res.lastIndexOf(sep)

            // reset result and last segment length if sep was not found in res
            if (sepidx_res === -1) {
              res = ''
              seglen = 0
            } else {
              // end result at index of last separator
              res = res.slice(0, sepidx_res)

              // reset last segment length
              seglen = res.length - 1 - res.lastIndexOf(sep)
            }

            // set last seperator index and reset dot character count
            sepidx = i
            dots = 0

            continue
          } else if (res.length > 0) {
            // set last seperator index
            sepidx = i

            // reset dot character count, result, and last segment length
            dots = 0
            res = ''
            seglen = 0

            continue
          }
        }

        // resolve past root if path is not absolute
        if (!absolute) {
          res += `${!res ? '' : sep}${DOT.repeat(2)}`
          seglen = 2
        }
      } else {
        if (res.length > 0) {
          // add segment
          res += `${sep}${path.slice(sepidx + 1, i)}`
        } else {
          // reset result to segment
          res = path.slice(sepidx + 1, i)
        }

        // reset last segment length
        seglen = i - sepidx - 1
      }

      // set last seperator index and reset dot character count
      sepidx = i
      dots = 0
    } else if (char === DOT && dots !== -1) {
      // encountered segment that is reference to parent directory ("..")
      ++dots
    } else {
      // iterated over segment
      dots = -1
    }
  }

  return res
}

export default normalizeString
