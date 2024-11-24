/**
 * @file dirname
 * @module pathe/lib/dirname
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import delimiter from '#lib/delimiter'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'

/**
 * Get the directory name of `input`, similar to the Unix `dirname` command.
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
 * @return {string}
 *  Directory name of `input`
 */
function dirname(this: void, input: URL | string): string {
  validateURLString(input, 'input')
  input = toPosix(toPath(input))

  if (input.length <= 1) return isSep(input) ? input : dot

  /**
   * Index to begin searching for directory name.
   *
   * @var {number} offset
   */
  let offset: number = 0

  /**
   * End index of root.
   *
   * @var {number} rootEnd
   */
  let rootEnd: number = -1

  if (isSep(input[offset])) {
    rootEnd = offset = 1

    if (isSep(input[offset])) {
      /**
       * Current position in {@linkcode input}.
       *
       * @var {number} j
       */
      let j: number = offset + 1

      /**
       * Last visited position in {@linkcode input}.
       *
       * @var {number} last
       */
      let last: number = j

      // match 1 or more non-path separators
      while (j < input.length && !isSep(input[j])) j++

      if (j < input.length && j !== last) {
        last = j

        // match 1 or more path separators
        while (j < input.length && isSep(input[j])) j++

        if (j < input.length && j !== last) {
          last = j

          // match 1 or more non-path separators
          while (j < input.length && !isSep(input[j])) j++

          // matched UNC root only
          if (j === input.length) return input

          // matched UNC root with leftovers.
          // offset by 1 to include the separator after the UNC root to
          // treat it as a "normal root" on top of a (UNC) root
          if (j !== last) rootEnd = offset = j + 1
        }
      }
    }
  } else if (DRIVE_PATH_REGEX.test(input)) {
    /**
     * Index of character after colon (`:`).
     *
     * @const {number} afterColon
     */
    const afterColon: number = input.indexOf(delimiter, offset) + 1

    rootEnd = offset = input.length > 2 && isSep(input[afterColon])
      ? afterColon + 1
      : afterColon
  }

  /**
   * End index of directory name.
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

  for (let i = input.length - 1; i >= offset; --i) {
    if (isSep(input[i])) {
      if (!separator) {
        end = i
        break
      }
    } else {
      // reached first character that is not a path separator
      separator = false
    }
  }

  return end === -1 && rootEnd === -1
    ? dot
    : input[0] === sep && end === 1
    ? sep + sep
    : input.slice(0, end === -1 ? rootEnd : end)
}

export default dirname
