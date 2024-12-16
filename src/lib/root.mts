/**
 * @file root
 * @module pathe/lib/root
 */

import canParseURL from '#internal/can-parse-url'
import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import delimiter from '#lib/delimiter'
import isSep from '#lib/is-sep'
import toPosix from '#lib/to-posix'

/**
 * Get the root of `input`.
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
  input = String(toPosix(input))

  if (input.length) {
    /**
     * End index of root.
     *
     * @var {number} end
     */
    let end: number = 0

    /**
     * Boolean indicating {@linkcode input} is just a root.
     *
     * @var {boolean} onlyRoot
     */
    let onlyRoot: boolean = false

    if (isSep(input)) {
      onlyRoot = true
    } else {
      /**
       * Index to begin search.
       *
       * @var {number} offset
       */
      let offset: number = 0

      if (canParseURL(input)) {
        const { hostname, pathname, protocol } = new URL(input)

        if (hostname) {
          if (protocol === 'file:') {
            offset = protocol.length
          } else {
            end = protocol.length + hostname.length + 2
          }
        } else if (input === protocol) {
          onlyRoot = true
          offset = -1
        } else {
          offset = input.lastIndexOf(pathname)

          // check for drive path so as not to mistake
          // next path separator as beginning of absolute path
          if (DRIVE_PATH_REGEX.test(pathname.slice(1))) offset++
        }
      }

      if (isSep(input[offset])) {
        end = offset + 1

        if (isSep(input[end])) {
          /**
           * Current position in {@linkcode input}.
           *
           * @var {number} j
           */
          let j: number = end + 1

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
              if (j === input.length) end = j
              // matched UNC root with leftovers.
              // offset by 1 to include the separator after the UNC root to
              // treat it as a "normal root" on top of a (UNC) root
              else if (j !== last) end = j + 1
            }
          }
        }
      } else if (DRIVE_PATH_REGEX.test(input.slice(offset))) {
        end = input.indexOf(delimiter, offset) + 1

        if (input.length <= end) {
          // `input` is just a drive root
          onlyRoot = true
        } else if (isSep(input[end])) {
          // `input` is just a device root
          if (input.length === ++end) onlyRoot = true
        }
      }
    }

    if (end || onlyRoot) return onlyRoot ? input : input.slice(0, end)
  }

  return ''
}

export default root
