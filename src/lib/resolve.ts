/**
 * @file Library - resolve
 * @module pathe/lib/resolve
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isSep from '#src/internal/is-sep'
import normalizeString from '#src/internal/normalize-string'
import validateString from '#src/internal/validate-string'
import sep from './sep'

/**
 * Resolves a sequence of paths or path segments into an absolute path.
 *
 * The given sequence of paths is processed from right to left, with each
 * subsequent `path` prepended until an absolute path is constructed.
 *
 * For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`,
 * calling `pathe.resolve('/foo', '/bar', 'baz')` would return `/bar/baz`
 * because `'baz'` is not an absolute path but `'/bar' + '/' + 'baz'` is.
 *
 * If, after processing all given `path` segments, an absolute path has not yet
 * been generated, the current working directory is used.
 *
 * The resulting path is normalized and trailing [separators][1] are removed
 * unless the path is resolved to the root directory.
 *
 * Zero-length `path` segments are ignored.
 *
 * If no `path` segments are passed, the absolute path of the current working
 * directory will be returned.
 *
 * [1]: {@link ./sep.ts}
 *
 * @param {string[]} paths - Path segment sequence
 * @return {string} Path segment sequence, `paths`, as absolute path
 * @throws {TypeError} If any segment in `paths` is not a string
 */
const resolve = (...paths: string[]): string => {
  /**
   * Absolute path check.
   *
   * @var {boolean} resolved_absolute
   */
  let resolved_absolute: boolean = false

  /**
   * Resolved drive letter or UNC path, if any.
   *
   * @var {string} resolved_device
   */
  let resolved_device: string = ''

  /**
   * Resolved path without {@linkcode resolved_device}.
   *
   * @var {string} tail
   */
  let resolved_tail: string = ''

  // process path segments from right to left
  for (let i = paths.length - 1; i >= -1; i--) {
    /**
     * Current path segment.
     *
     * @var {string} path
     */
    let path: string = ''

    if (i >= 0) {
      path = ensurePosix(validateString(paths[i], 'path'))
      if (path.length === 0) continue
    } else if (resolved_device.length === 0) {
      path = ensurePosix(process.cwd())
    } else {
      /*
       * Windows has the concept of drive-specific current working directories.
       *
       * If a drive letter has been resolved before an absolute path, we get the
       * current working directory (cwd) for that drive, or `process.cwd()` if
       * the drive's current working directory is not defined.
       *
       * Note that at this point, {@linkcode device} is guaranteed to **not** be
       * a UNC path because UNC path are always absolute.
       *
       * If a cwd was found, but doesn't point to the drive, we default to the
       * drive's root.
       */

      // set path to current working directory
      path = ensurePosix(process.env[`=${resolved_device}`] ?? process.cwd())

      /**
       * Current working directory pointer check.
       *
       * @const {boolean} device_match
       */
      const device_match: boolean =
        path.slice(0, 2).toLowerCase() === resolved_device.toLowerCase()

      // default to drive root if cwd was found but does not point to drive
      if (!path || (!device_match && isSep(path.charAt(2)))) {
        path = `${resolved_device}`
      }
    }

    /**
     * Current path length.
     *
     * @const {number} len
     */
    const len: number = path.length

    /**
     * Current absolute path check.
     *
     * @var {boolean} absolute
     */
    let absolute: boolean = false

    /**
     * Current drive letter or UNC path, if any.
     *
     * @var {string} device
     */
    let device: string = ''

    /**
     * Start index of {@linkcode resolved_tail}.
     *
     * @var {string} offset
     */
    let offset: number = 0

    // set device and adjust offset is path is drive path
    if (isDrivePath(path)) {
      device = path.slice(0, (offset = 2))

      if (len > 2 && isSep(path.charAt(offset))) {
        absolute = true
        offset = 3
      }
    }

    // set device and adjust offset if path is absolute or unc path
    if (isSep(path.charAt(0))) {
      absolute = true
      offset = 1

      // try setting device if path is possible unc path
      if (isSep(path.charAt(1))) {
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
        while (j < len && !isSep(path.charAt(j))) j++

        if (j < len && j !== last) {
          /**
           * Possible UNC path component.
           *
           * @const {string} host
           */
          const host: string = path.slice(last, j)

          // set last visited position to end of host
          last = j

          // match 1 or more path separators
          while (j < len && isSep(path.charAt(j))) j++

          if (j < len && j !== last) {
            // set last visited position
            last = j

            // match 1 or more non-path separators
            while (j < len && !isSep(path.charAt(j))) j++

            // matched unc root
            if (j === len || j !== last) {
              device = `${sep}${sep}${host}${sep}${path.slice(last, j)}`
              offset = j
            }
          }
        }
      }
    }

    // try resetting resolved device
    if (device.length > 0) {
      if (resolved_device.length > 0) {
        // path points to another device => not applicable
        if (device.toLowerCase() !== resolved_device.toLowerCase()) continue
      } else {
        // reset resolved device
        resolved_device = device
      }
    }

    // try finishing resolution
    if (resolved_absolute) {
      // exit if resolved path is absolute and device has been revolved
      if (resolved_device.length > 0) break
    } else {
      // update resolved tail
      resolved_tail = `${path.slice(offset)}${sep}${resolved_tail}`

      // exit if resolved path is now absolute and device has been resolved
      if ((resolved_absolute = absolute) && resolved_device.length > 0) break
    }
  }

  /*
   * Our resolved path should be absolute at this point. The tail of our path is
   * normalized anyway, however, to handle relative paths. Relative paths can
   * occur on `process.cwd()` failure.
   */
  resolved_tail = normalizeString(resolved_tail, !resolved_absolute)

  return resolved_absolute
    ? `${resolved_device}${sep}${resolved_tail}`
    : `${resolved_device}${resolved_tail}` || DOT
}

export default resolve
