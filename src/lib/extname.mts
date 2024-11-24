/**
 * @file extname
 * @module pathe/lib/extname
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import type basename from '#lib/basename'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Get the file extension of `input` from the last occurrence of the `.` (dot)
 * character (`.`) to end of the string in the last portion of `input`.
 *
 * If there is no `.` in the last portion of `input`, or if there are no `.`
 * characters other than the first character of the {@linkcode basename} of
 * `input`, an empty string is returned.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * @see {@linkcode EmptyString}
 * @see {@linkcode Ext}
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @return {EmptyString | Ext}
 *  Extension of `input` or empty string
 */
function extname(this: void, input: URL | string): EmptyString | Ext {
  validateURLString(input, 'input')
  input = toPosix(toPath(input))

  if (!input.includes(dot)) return ''

  /**
   * Index to begin searching for extension.
   *
   * @var {number} offset
   */
  let offset: number = 0

  /**
   * Start index of {@linkcode input}'s basename.
   *
   * @var {number} part
   */
  let part: number = 0

  /**
   * State of characters, if any, before first dot character and after any path
   * separators in {@linkcode input}.
   *
   * @var {number} predot
   */
  let predot: number = 0

  /**
   * Boolean indicating a path separator was seen.
   *
   * @var {boolean} separator
   */
  let separator: boolean = true

  /**
   * Start index of extension.
   *
   * @var {number} start
   */
  let start: number = -1

  /**
   * End index of extension.
   *
   * @var {number} end
   */
  let end: number = -1

  // check for drive path so as not to mistake the next path separator as an
  // extra separator at the end of the path that can be disregarded
  if (input.length >= 2 && DRIVE_PATH_REGEX.test(input)) {
    offset = part = 2
  }

  // get start and end indices of extension
  for (let i = input.length - 1; i >= offset; --i) {
    /**
     * Current character in {@linkcode input}.
     *
     * @const {string} char
     */
    const char: string = input[i]!

    if (isSep(char)) {
      if (!separator) {
        // stop if a non-trailing path separator was reached
        part = i + 1
        break
      }

      continue
    }

    if (end === -1) {
      // reached first non-path separator -> end of extension
      end = i + 1
      separator = false
    }

    if (char === dot) {
      // first dot -> start of extension
      if (start === -1) start = i
      else if (predot !== 1) predot = 1
    } else if (start !== -1) {
      // a non-dot and non-separator character was encountered before the dot
      // character, so there is a good chance at having a non-empty extension
      predot = -1
    }
  }

  if (
    start === -1 ||
    end === -1 ||
    // non-dot character immediately before the dot
    predot === 0 ||
    // right-most trimmed path component is exactly '..'
    (predot === 1 && start === end - 1 && start === part + 1)
  ) {
    return ''
  }

  return input.slice(start, end) as Ext
}

export default extname
