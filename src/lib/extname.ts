/**
 * @file extname
 * @module pathe/lib/extname
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import type { Ext } from '#src/types'
import type { EmptyString } from '@flex-development/tutils'

/**
 * Returns the extension of the given `path`, from the last occurrence of the
 * `.` (dot) character to end of the string in the last portion of the path.
 *
 * If there is no `.` in the last portion of the path, or if there are no `.`
 * characters other than the first character of the path's [`basename`][1], an
 * empty string will be returned.
 *
 * [1]: {@link ./basename.ts}
 *
 * @param {string} path - Path to evaluate
 * @return {EmptyString | Ext} Extension of `path` or empty string
 * @throws {TypeError} If `path` is not a string
 */
const extname = (path: string): EmptyString | Ext => {
  validateString(path, 'path')

  // exit early if path does not contain any dot characters
  if (!path.includes(DOT)) return ''

  // ensure path meets posix standards
  path = ensurePosix(path)

  /**
   * Index to begin searching for extension.
   *
   * @var {number} offset
   */
  let offset: number = 0

  /**
   * Start index of {@linkcode path}'s basename.
   *
   * @var {number} part
   */
  let part: number = 0

  /**
   * State of characters, if any, before first dot character and after any path
   * separators in {@linkcode path}.
   *
   * @var {number} predot
   */
  let predot: number = 0

  /**
   * Directory separator match check.
   *
   * @var {boolean} sep_match
   */
  let sep_match: boolean = true

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

  // check for drive path so as not to mistake the following path separator as
  // an extra separator at the end of the path that can be disregarded
  if (path.length >= 2 && isDrivePath(path)) {
    offset = part = 2
  }

  // get start and end indices of extension
  for (let i = path.length - 1; i >= offset; --i) {
    /**
     * Character at {@linkcode i} in {@linkcode path}.
     *
     * @const {string} char
     */
    const char: string = path.charAt(i)

    // adjust start index of basename
    if (isSep(char)) {
      if (!sep_match) {
        // encountered separator that is not trailing separator
        part = i + 1
        break
      }

      continue
    }

    // set end index of extension
    if (end === -1) {
      end = i + 1
      sep_match = false
    }

    // set start index of extension and/or update predot state
    if (char === DOT) {
      // set start index of extension
      if (start === -1) start = i
      else if (predot !== 1) predot = 1
    } else if (start !== -1) {
      // a non-dot and non-separator character was encountered before the dot
      // character, so there is a good chance at having a non-empty extension
      predot = -1
    }
  }

  return start === -1 || end === -1 || predot === 0
    ? ''
    : start === part + 1 && start === end - 1 && predot === 1
    ? ''
    : (path.slice(start, end) as Ext)
}

export default extname
