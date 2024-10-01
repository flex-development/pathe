/**
 * @file resolveWith
 * @module pathe/lib/resolveWith
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import normalizeString from '#internal/normalize-string'
import process from '#internal/process'
import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import type { Cwd } from '@flex-development/pathe'

/**
 * Resolve a sequence of paths or path segments into an absolute path.
 *
 * The given sequence of paths is processed from right to left, with each
 * subsequent path prepended until an absolute path is constructed.
 *
 * For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`,
 * calling `pathe.resolve('/foo', '/bar', 'baz')` would return `/bar/baz`
 * because `'baz'` is not an absolute path, but `'/bar' + '/' + 'baz'` is.
 *
 * If, after processing all given `path` segments, an absolute path has not yet
 * been generated, the current working directory is used.
 *
 * The resulting path is normalized and trailing separators are removed unless
 * the path is resolved to the root directory.
 *
 * Zero-length `path` segments are ignored.
 *
 * If no `path` segments are passed, the absolute path of the current working
 * directory is returned.
 *
 * @see {@linkcode Cwd}
 *
 * @category
 *  utils
 *
 * @param {ReadonlyArray<string> | string} paths
 *  Sequence of paths or path segments
 * @param {Cwd | null | undefined} [cwd]
 *  Get the path to the current working directory
 * @param {Partial<Record<string, string>> | null | undefined} [env]
 *  Environment variables
 * @return {string}
 *  Absolute path
 */
function resolveWith(
  paths: string | readonly string[],
  cwd?: Cwd | null | undefined,
  env?: Partial<Record<string, string>> | null | undefined
): string {
  if (typeof cwd !== 'function') cwd = process.cwd
  if (typeof env !== 'object' || env === null) env = process.env
  if (typeof paths === 'string') paths = [paths]

  /**
   * Absolute path check.
   *
   * @var {boolean} resolvedAbsolute
   */
  let resolvedAbsolute: boolean = false

  /**
   * Resolved drive letter or UNC path, if any.
   *
   * @var {string} resolvedDevice
   */
  let resolvedDevice: string = ''

  /**
   * Resolved path without {@linkcode resolvedDevice}.
   *
   * @var {string} resolvedTail
   */
  let resolvedTail: string = ''

  for (let i = paths.length - 1; i >= -1; i--) {
    /**
     * Current path segment.
     *
     * @var {string} path
     */
    let path: string

    if (i >= 0) {
      path = paths[i]!
      validateString(path, `paths[${i}]`)
      path = toPosix(path)

      // skip empty path segments
      if (!path.length) continue
    } else if (!resolvedDevice.length) {
      path = toPosix(cwd())
    } else {
      /*
       * Windows has the concept of drive-specific current working directories.
       *
       * If a drive letter has been resolved before an absolute path, we get the
       * current working directory (cwd) for that drive, or `cwd()` if the
       * drive's current working directory is not defined.
       *
       * Note that at this point, {@linkcode device} is guaranteed to **not** be
       * a UNC path because UNC path are always absolute.
       *
       * If a cwd was found, but doesn't point to the drive, we default to the
       * drive's root.
       */
      path = toPosix(env[`=${resolvedDevice}`] || cwd())

      // default to drive root if cwd was found but does not point to drive
      if (
        !path ||
        (
          path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
          isSep(path[2])
        )
      ) {
        path = `${resolvedDevice}`
      }
    }

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
     * End index of root.
     *
     * @var {number} rootEnd
     */
    let rootEnd: number = 0

    if (isSep(path[rootEnd])) {
      absolute = true
      rootEnd++

      if (isSep(path[rootEnd])) {
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
           * Possible UNC path component.
           *
           * @const {string} host
           */
          const host: string = path.slice(last, j)

          last = j

          // match 1 or more path separators
          while (j < path.length && isSep(path[j])) j++

          if (j < path.length && j !== last) {
            last = j

            // match 1 or more non-path separators
            while (j < path.length && !isSep(path[j])) j++

            // matched unc root
            if (j === path.length || j !== last) {
              device = `${sep}${sep}${host}${sep}${path.slice(last, j)}`
              rootEnd = j
            }
          }
        }
      }
    } else if (DRIVE_PATH_REGEX.test(path)) {
      rootEnd = 2
      device = path.slice(0, rootEnd)

      if (path.length > rootEnd && isSep(path[rootEnd])) {
        rootEnd++
        absolute = true
      }
    }

    if (device) {
      if (resolvedDevice) {
        // path points to another device -> not applicable
        if (device.toLowerCase() !== resolvedDevice.toLowerCase()) continue
      } else {
        resolvedDevice = device
      }
    }

    if (resolvedAbsolute) {
      if (resolvedDevice.length) break
    } else {
      resolvedTail = `${path.slice(rootEnd)}${sep}${resolvedTail}`
      resolvedAbsolute = absolute
      if (absolute && resolvedDevice.length) break
    }
  }

  // the resolved path should be absolute at this point, but `resolvedTail` is
  // normalized anyway in case of `cwd()` failure.
  resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute)

  return resolvedAbsolute
    ? `${resolvedDevice}${sep}${resolvedTail}`
    : `${resolvedDevice}${resolvedTail}` || dot
}

export default resolveWith
