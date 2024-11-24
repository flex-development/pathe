/**
 * @file root
 * @module pathe/lib/root
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import delimiter from '#lib/delimiter'
import isSep from '#lib/is-sep'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'

/**
 * Get the root of `input`.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @return {string}
 *  Root of `input`
 */
function root(this: void, input: URL | string): string {
  validateURLString(input, 'input')
  input = toPath(input)

  if (input.length) {
    /**
     * Boolean indicating {@linkcode input} is just a root.
     *
     * @var {boolean} onlyRoot
     */
    let onlyRoot: boolean = false

    /**
     * End index of root.
     *
     * @var {number} rootEnd
     */
    let rootEnd: number = 0

    if (isSep(input[rootEnd])) {
      rootEnd = 1

      if (isSep(input)) {
        // `input` is just a separator
        onlyRoot = true
      } else if (isSep(input[rootEnd])) {
        /**
         * Current position in {@linkcode input}.
         *
         * @var {number} j
         */
        let j: number = rootEnd + 1

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
            if (j === input.length) rootEnd = j
            // matched UNC root with leftovers.
            // offset by 1 to include the separator after the UNC root to
            // treat it as a "normal root" on top of a (UNC) root
            else if (j !== last) rootEnd = j + 1
          }
        }
      }
    } else if (DRIVE_PATH_REGEX.test(input)) {
      rootEnd = input.indexOf(delimiter) + 1

      if (input.length <= rootEnd) {
        // `input` is just a drive root
        onlyRoot = true
      } else if (isSep(input[rootEnd])) {
        // `input` is just a device root
        if (input.length === ++rootEnd) onlyRoot = true
      }
    }

    if (rootEnd) return toPosix(onlyRoot ? input : input.slice(0, rootEnd))
  }

  return ''
}

export default root
