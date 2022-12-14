/**
 * @file basename
 * @module pathe/lib/basename
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'

/**
 * Returns the last portion of a `path`, similar to the Unix `basename` command.
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
  validateString(path, 'path')
  suffix !== undefined && validateString(suffix, 'suffix')

  // ensure path and suffix meet posix standards
  path = ensurePosix(path)
  suffix !== undefined && (suffix = ensurePosix(suffix))

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

  // check for drive path so as not to mistake the following path separator as
  // an extra separator at the end of the path that can be disregarded
  if (path.length >= 2 && isDrivePath(path)) start = 2

  // get basename without attempting to remove suffix
  if (!suffix || suffix.length > path.length) {
    for (let i = path.length - 1; i >= start; --i) {
      if (isSep(path.charAt(i))) {
        // encountered separator that is not trailing separator
        if (!sep_match) {
          start = i + 1
          break
        }
      } else if (end === -1) {
        // encountered character that is not a separator => end path component
        sep_match = false
        end = i + 1
      }
    }

    // basename can be safely extracted using slice when end is greater than -1
    return end > -1 ? path.slice(start, end) : ''
  }

  /**
   * Index of {@linkcode suffix} in {@linkcode path}.
   *
   * @var {number} sdx
   */
  let sdx: number = suffix.length - 1

  /**
   * Index of character that is not a path separator.
   *
   * @var {number} nonsep
   */
  let nonsep: number = -1

  for (let i = path.length - 1; i >= 0; --i) {
    /**
     * Character at {@linkcode i} in {@linkcode path}.
     *
     * @const {string} char
     */
    const char: string = path.charAt(i)

    if (isSep(char)) {
      // encountered separator that is not trailing separator
      if (!sep_match) {
        start = i + 1
        break
      }
    } else {
      if (nonsep === -1) {
        // set index of character that is not a path separator in case suffix is
        // not found in path
        nonsep = i + 1
        sep_match = false
      }

      if (sdx >= 0) {
        // try matching suffix
        if (char === suffix.charAt(sdx)) {
          // end path component
          if (--sdx === -1) end = i
        } else {
          // if suffix is not found, basename stops at last index of character
          // that is not a path separator
          end = nonsep
          sdx = -1
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
