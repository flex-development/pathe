/**
 * @file basename
 * @module pathe/lib/basename
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import validateString from '#src/internal/validate-string'
import sep from './sep'

/**
 * Returns the last portion of a path, similar to the Unix `basename` command.
 *
 * Trailing [directory separators][1] are ignored.
 *
 * [1]: https://nodejs.org/api/path.html#pathsep
 *
 * @param {string} path - Path to evaluate
 * @param {string} [suffix] - Suffix to remove from result
 * @return {string} Last portion of `path`
 * @throws {TypeError} If `path` is not a string or `suffix` is not a string
 */
const basename = (path: string, suffix?: string): string => {
  path = ensurePosix(path)
  suffix !== undefined && validateString(suffix, 'suffix')

  // return empty string if path and suffix are equal
  if (suffix === path) return ''

  /**
   * Start index of basename.
   *
   * @var {number} start
   */
  let start: number = 0

  /**
   * End index of basename.
   *
   * @var {number} end
   */
  let end: number = -1

  /**
   * Path separator match check.
   *
   * @var {boolean} sep_match
   */
  let sep_match: boolean = true

  // check for drive path so as not to mistake a following path separator as an
  // extra separator at the end of the path that can be disregarded
  if (path.length >= 2 && isDrivePath(path)) start = 2

  // get basename without attempting to remove suffix
  if (!suffix || suffix.length > path.length) {
    for (let i = path.length - 1; i >= start; --i) {
      if (path.charAt(i) === sep) {
        // if separator was reached, and is not a trailing separator, exit early
        if (!sep_match) {
          start = i + 1
          break
        }
      } else if (end === -1) {
        // set index of first character that is not a path separator in case
        // suffix is not found in path
        sep_match = false
        end = i + 1
      }
    }

    return end === -1 ? '' : path.slice(start, end)
  }

  /**
   * Index of {@linkcode suffix} in {@linkcode path}.
   *
   * @var {number} sdx
   */
  let sdx: number = suffix.length - 1

  /**
   * Index of first character that is not a path separator.
   *
   * @var {number} nonsep
   */
  let nonsep: number = -1

  for (let i = path.length - 1; i >= 0; --i) {
    /**
     * Character at {@linkcode i} in {@linkcode path}.
     *
     * @const {string} code
     */
    const char: string = path.charAt(i)

    if (char === sep) {
      // if separator was reached, and is not a trailing separator, exit early
      if (!sep_match) {
        start = i + 1
        break
      }
    } else {
      if (nonsep === -1) {
        // set index of first character that is not a path separator in case
        // suffix is not found in path
        nonsep = i + 1
        sep_match = false
      }

      if (sdx >= 0) {
        // try matching suffix
        if (char === suffix.charAt(sdx)) {
          // set end of path segment
          if (--sdx === -1) end = i
        } else {
          // if suffix is not found, basename stops at nonsep
          sdx = -1
          end = nonsep
        }
      }
    }
  }

  return path.slice(
    start,
    start === end ? nonsep : end === -1 ? path.length : end
  )
}

export default basename
