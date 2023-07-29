/**
 * @file Library - toNamespacedPath
 * @module pathe/lib/toNamespacedPath
 */

import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isUncPath from '#src/internal/is-unc-path'
import { DOT, at, includes, isString } from '@flex-development/tutils'
import isAbsolute from './is-absolute'
import resolve from './resolve'
import sep from './sep'

/**
 * Returns an equivalent [namespace-prefixed path][1] for the given `path`.
 *
 * If `path` is not a [drive path][2] or [UNC path][3], `path` will be returned
 * without modifications.
 *
 * [1]: https://docs.microsoft.com/windows/desktop/FileIO/naming-a-file#namespaces
 * [2]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
 * [3]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
 *
 * @param {string} path - Path to evaluate
 * @return {string} `path` without modification or as namespace-prefixed path
 */
const toNamespacedPath = (path: string): string => {
  // exit early if path is not a string
  if (!isString(path) || !path) return path

  // ensure path meets posix standards
  path = ensurePosix(path)

  /**
   * Fully resolved {@linkcode path}.
   *
   * @const {string} resolved
   */
  const resolved: string = resolve(path)

  // matched device root => convert path to long unc path
  if (isDrivePath(resolved) && isAbsolute(resolved)) {
    return `${sep.repeat(2)}?${sep}${resolved}`
  }

  // matched non-long unc root => convert the path to long unc path
  if (isUncPath(resolved) && !includes(['?', DOT], at(resolved, 2))) {
    return `${sep.repeat(2)}?${sep}UNC${sep}${resolved.slice(2)}`
  }

  return path
}

export default toNamespacedPath
