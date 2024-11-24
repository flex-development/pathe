/**
 * @file resolveWith
 * @module pathe/lib/resolveWith
 */

import { DRIVE_PATH_REGEX, sepWindows } from '#internal/constants'
import normalizeString from '#internal/normalize-string'
import process from '#internal/process'
import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import type { Cwd, ResolveWithOptions } from '@flex-development/pathe'

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
 * @see {@linkcode ResolveWithOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {ReadonlyArray<string> | string} paths
 *  Sequence of paths or path segments
 * @param {ResolveWithOptions | null | undefined} [options]
 *  Resolution options
 * @return {string}
 *  Absolute path
 */
function resolveWith(
  this: void,
  paths: string | readonly string[],
  options?: ResolveWithOptions | null | undefined
): string {
  /**
   * Get the path to the current working directory.
   *
   * @var {Cwd | null | undefined} cwd
   */
  let cwd: Cwd | null | undefined = options?.cwd

  /**
   * Environment variables.
   *
   * @var {Partial<Record<string, string>> | null | undefined} env
   */
  let env: Partial<Record<string, string>> | null | undefined = options?.env

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

      // skip empty path segments
      if (!path.length) continue
    } else if (!resolvedDevice.length) {
      path = cwd()
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
      path = env[`=${resolvedDevice}`] || cwd()

      // default to drive root if cwd was found but does not point to drive
      if (
        !path ||
        (
          path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
          isSep(path[2])
        )
      ) {
        path = resolvedDevice + sep
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

    if (path.length === 1) {
      if (isSep(path)) {
        absolute = true
        rootEnd = 1
      }
    } else if (isSep(path[0])) {
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

            // matched device root or unc root
            if (j === path.length || j !== last) {
              device = sepWindows.repeat(2) + comp

              if (comp !== dot && comp !== '?') {
                // matched unc root
                device += sepWindows + path.slice(last, j)
                rootEnd = j
              } else {
                // matched device root (i.e. `//./PHYSICALDRIVE0`)
                rootEnd = 4
              }
            }
          }
        }
      }
    } else if (DRIVE_PATH_REGEX.test(path)) {
      rootEnd = 2
      device = path.slice(0, rootEnd)

      if (path.length > rootEnd && isSep(path[rootEnd])) {
        // treat separator after drive name as absolute path indicator
        absolute = true
        rootEnd++
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

  return toPosix(
    resolvedAbsolute
      ? `${resolvedDevice}${sep}${resolvedTail}`
      : `${resolvedDevice}${resolvedTail}` || dot
  )
}

export default resolveWith
