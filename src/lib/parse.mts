/**
 * @file parse
 * @module pathe/lib/parse
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateURLString from '#internal/validate-url-string'
import extname from '#lib/extname'
import isDeviceRoot from '#lib/is-device-root'
import isSep from '#lib/is-sep'
import removeExt from '#lib/remove-ext'
import root from '#lib/root'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import type { ParsedPath } from '@flex-development/pathe'

/**
 * Create an object whose properties represent significant elements of `input`.
 * Trailing directory separators are ignored.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * @see {@linkcode ParsedPath}
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to parse
 * @return {ParsedPath}
 *  Significant elements of `path`
 */
function parse(this: void, input: URL | string): ParsedPath {
  validateURLString(input, 'input')
  input = toPath(input)

  /**
   * Significant elements of {@linkcode input}.
   *
   * @const {ParsedPath} parsed
   */
  const parsed: ParsedPath = { base: '', dir: '', ext: '', name: '', root: '' }

  if (input.length) {
    input = toPosix(input)

    if (
      isSep(input) ||
      isDeviceRoot(input) ||
      input.length === 2 && DRIVE_PATH_REGEX.test(input)
    ) {
      parsed.root = parsed.dir = input
    } else if (input.length === 1) {
      parsed.base = parsed.name = input
    } else {
      parsed.root = root(input)

      /**
       * End index of {@linkcode parsed.base}.
       *
       * @var {number} endBase
       */
      let endBase: number = -1

      /**
       * Start index of {@linkcode parsed.base}.
       *
       * @var {number} startBase
       */
      let startBase: number = parsed.root.length

      /**
       * Boolean indicating a path separator was seen.
       *
       * @var {boolean} separator
       */
      let separator: boolean = true

      // get non-dir info
      for (let i = input.length - 1; i >= parsed.root.length; --i) {
        if (isSep(input[i])) {
          // reached a path separator that was not part of a set of path
          // separators at the end of the string
          if (!separator) {
            startBase = i + 1
            break
          }

          continue
        }

        if (endBase === -1) {
          separator = false
          endBase = i + 1
        }
      }

      if (endBase !== -1) {
        parsed.base = input.slice(startBase, endBase)
        parsed.ext = extname(input)
        parsed.name = removeExt(parsed.base, parsed.ext)
      }

      parsed.dir = startBase && startBase !== parsed.root.length
        ? input.slice(0, startBase - 1)
        : parsed.root
    }
  }

  return parsed
}

export default parse
