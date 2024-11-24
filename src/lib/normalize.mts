/**
 * @file normalize
 * @module pathe/lib/normalize
 */

import { DRIVE_PATH_REGEX, sepWindows } from '#internal/constants'
import normalizeString from '#internal/normalize-string'
import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import isAbsolute from '#lib/is-absolute'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'

/**
 * Normalize `path`, resolving `'..'` and `'.'` segments.
 *
 * When multiple, sequential path segment separators are found, they are
 * replaced by a single instance of {@linkcode sep}. Trailing separators are
 * preserved.
 *
 * If `path` is a zero-length string, {@linkcode dot} is returned, representing
 * the current working directory.
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {string} path
 *  The path to normalize
 * @return {string}
 *  Normalized `path`
 */
function normalize(this: void, path: string): string {
  validateString(path, 'path')

  /**
   * Normalized path.
   *
   * @var {string} normalized
   */
  let normalized: string = ''

  if (path.length <= 1) {
    normalized = path || dot
  } else {
    /**
     * Absolute path check.
     *
     * @var {boolean} absolute
     */
    let absolute: boolean = false

    /**
     * Drive letter or UNC path component(s), if any.
     *
     * @var {string} device
     */
    let device: string = ''

    /**
     * End index of root.
     *
     * @var {number} rootEnd
     */
    let rootEnd: number = 0

    if (isSep(path[0])) {
      absolute = true

      if (!isSep(path[1])) {
        rootEnd = 1
      } else {
        /**
         * Current position in {@linkcode path}.
         *
         * @var {number} j
         */
        let j: number = 2

        /**
         * Last visited position in {@linkcode path}.
         *
         * @var {number} last
         */
        let last: number = j

        // match 1 or more non-path separators
        while (j < path.length && !isSep(path[j])) j++

        if (j < path.length && j !== last) {
          /**
           * Path component.
           *
           * @const {string} comp
           */
          const comp: string = path.slice(last, j)

          // matched!
          last = j

          // match 1 or more path separators
          while (j < path.length && isSep(path[j])) j++

          if (j < path.length && j !== last) {
            // matched!
            last = j

            // match 1 or more non-path separators
            while (j < path.length && !isSep(path[j])) j++

            if (j === path.length || j !== last) {
              device = sepWindows.repeat(2) + comp

              if (comp === dot || comp === '?') {
                // matched device root (i.e. `//./PHYSICALDRIVE0`)
                rootEnd = 4
              } else if (j === path.length) {
                // matched unc root only: return normalized version of UNC root
                // since there is nothing left to process
                device += sepWindows + path.slice(last) + sepWindows
                return toPosix(device)
              } else {
                // matched unc root with leftovers
                device += sepWindows + path.slice(last, j)
                rootEnd = j
              }
            }
          }
        }
      }
    } else if (DRIVE_PATH_REGEX.test(path)) {
      device = path.slice(0, rootEnd = 2)
      if ((absolute = isAbsolute(path))) rootEnd++
    }

    /**
     * Tail end of normalized path.
     *
     * @var {string} tail
     */
    let tail: string = ''

    if (rootEnd < path.length) {
      tail = normalizeString(path.slice(rootEnd), !absolute)
    }

    if (!tail.length && !absolute) tail = dot
    if (tail.length && isSep(path[path.length - 1])) tail += sep

    normalized = device + (absolute ? sep : '') + tail
  }

  return toPosix(normalized)
}

export default normalize
