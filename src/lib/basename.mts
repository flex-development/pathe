/**
 * @file basename
 * @module pathe/lib/basename
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import validateURLString from '#internal/validate-url-string'
import delimiter from '#lib/delimiter'
import isSep from '#lib/is-sep'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'

/**
 * Get the last portion of `input`, similar to the Unix `basename` command.
 *
 * Trailing [directory separators][sep] are ignored.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * [sep]: https://nodejs.org/api/path.html#pathsep
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {string | null | undefined} [suffix]
 *  The suffix to remove
 * @return {string}
 *  Last portion of `input` or empty string
 */
function basename(
  this: void,
  input: URL | string,
  suffix?: string | null | undefined
): string {
  if (suffix !== null && suffix !== undefined) {
    validateString(suffix, 'suffix')
    suffix = toPosix(suffix)
  }

  validateURLString(input, 'input')
  input = toPosix(toPath(input))

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
   * Boolean indicating a path separator was seen.
   *
   * @var {boolean} separator
   */
  let separator: boolean = true

  // check for drive path so as not to mistake the next path separator as an
  // extra separator at the end of the path that can be disregarded
  if (DRIVE_PATH_REGEX.test(input)) start = input.indexOf(delimiter) + 1

  if (
    typeof suffix === 'string' &&
    suffix.length &&
    suffix.length <= input.length
  ) {
    if (input === suffix) return ''

    /**
     * Start index of file extension.
     *
     * @var {number} extIdx
     */
    let extIdx: number = suffix.length - 1

    /**
     * Index of first character that is not a path segment separator.
     *
     * @var {number} firstNonSlashEnd
     */
    let firstNonSlashEnd: number = -1

    for (let i = input.length - 1; i >= start; --i) {
      /**
       * Current character.
       *
       * @const {string} char
       */
      const char: string = input[i]!

      if (isSep(char)) {
        // stop if a non-trailing path separator was reached
        if (!separator) {
          start = i + 1
          break
        }
      } else {
        if (firstNonSlashEnd === -1) {
          // store current index of first character that is not a path separator
          // in case a match for suffix is not found
          separator = false
          firstNonSlashEnd = i + 1
        }

        if (extIdx >= 0) {
          if (char === suffix[extIdx]) {
            // `suffix` was matched -> end of path segment
            if (--extIdx === -1) end = i
          } else {
            // no match for `suffix` -> result is the entire path
            extIdx = -1
            end = firstNonSlashEnd
          }
        }
      }
    }

    if (start === end) end = firstNonSlashEnd
    else if (end === -1) end = input.length
  } else {
    for (let i = input.length - 1; i >= start; --i) {
      if (isSep(input[i])) {
        if (!separator) {
          // exit if a non-trailing path separator was reached
          start = i + 1
          break
        }
      } else if (end === -1) {
        // first character that is not a path separator was reached,
        // mark end of path component
        separator = false
        end = i + 1
      }
    }

    if (end === -1) return ''
  }

  return input.slice(start, end)
}

export default basename
