/**
 * @file parse
 * @module pathe/lib/parse
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import type { ParsedPath } from '@flex-development/pathe'
import extname from './extname'
import isDeviceRoot from './is-device-root'
import isSep from './is-sep'
import removeExt from './remove-ext'
import root from './root'
import toPosix from './to-posix'

/**
 * Create an object whose properties represent significant elements of `path`.
 * Trailing directory separators are ignored.
 *
 * @see {@linkcode ParsedPath}
 *
 * @category
 *  core
 *
 * @param {string} path
 *  Path to handle
 * @return {ParsedPath}
 *  Significant elements of `path`
 */
function parse(path: string): ParsedPath {
  validateString(path, 'path')

  /**
   * Significant elements of {@linkcode path}.
   *
   * @const {ParsedPath} parsed
   */
  const parsed: ParsedPath = { base: '', dir: '', ext: '', name: '', root: '' }

  if (path.length) {
    path = toPosix(path)

    if (
      isSep(path) ||
      isDeviceRoot(path) ||
      path.length === 2 && DRIVE_PATH_REGEX.test(path)
    ) {
      parsed.root = parsed.dir = path
    } else if (path.length === 1) {
      parsed.base = parsed.name = path
    } else {
      parsed.root = root(path)

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
      for (let i = path.length - 1; i >= parsed.root.length; --i) {
        if (isSep(path[i])) {
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
        parsed.base = path.slice(startBase, endBase)
        parsed.ext = extname(path)
        parsed.name = removeExt(parsed.base, parsed.ext)
      }

      parsed.dir = startBase && startBase !== parsed.root.length
        ? path.slice(0, startBase - 1)
        : parsed.root
    }
  }

  return parsed
}

export default parse
