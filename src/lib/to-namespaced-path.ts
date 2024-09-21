/**
 * @file toNamespacedPath
 * @module pathe/lib/toNamespacedPath
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import dot from './dot'
import isSep from './is-sep'
import resolve from './resolve'
import toPosix from './to-posix'

/**
 * Get an equivalent [namespace-prefixed path][namespace] for `path`.
 *
 * > 👉 If `path` is not a [drive][drive] or [UNC][unc] path, it will be
 * > returned without modifications.
 *
 * [drive]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
 * [namespace]: https://docs.microsoft.com/windows/desktop/FileIO/naming-a-file#namespaces
 * [unc]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
 *
 * @category
 *  core
 *
 * @param {string} path
 *  Path to handle
 * @return {string}
 *  Namespace-prefixed path or `path` without modifications
 */
function toNamespacedPath(path: string): string {
  validateString(path, 'path')

  if (path) {
    path = toPosix(path)

    /**
     * Fully resolved {@linkcode path}.
     *
     * @const {string} resolved
     */
    const resolved: string = resolve(path)

    if (resolved.length > 2) {
      // matched non-long unc root -> convert the path to long unc path
      if (
        isSep(resolved[0]) &&
        isSep(resolved[1]) &&
        !['?', dot].includes(resolved[2]!)
      ) {
        return `${toPosix('\\\\?\\UNC\\')}${resolved.slice(2)}`
      }

      // matched device root -> convert path to long unc path
      if (DRIVE_PATH_REGEX.test(resolved) && isSep(resolved[2])) {
        return `${toPosix('\\\\?\\')}${resolved}`
      }
    }

    return resolved
  }

  return path
}

export default toNamespacedPath
