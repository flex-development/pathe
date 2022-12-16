/**
 * @file format
 * @module pathe/lib/format
 */

import type { FormatInputPathObject } from '#src/interfaces'
import ensurePosix from '#src/internal/ensure-posix'
import validateObject from '#src/internal/validate-object'
import formatExt from '#src/utils/format-ext'
import sep from './sep'

/**
 * Returns a path string from an object &mdash; the opposite of [`parse`][1].
 *
 * When adding properties to `pathObject`, there are combinations where one
 * property has priority over another:
 *
 * - `pathObject.root` is ignored if `pathObject.dir` is provided
 * - `pathObject.ext` is ignored if `pathObject.base` exists
 * - `pathObject.name` is ignored if `pathObject.base` exists
 *
 * [1]: {@link ./parse.ts}
 *
 * @param {FormatInputPathObject} pathObject - Object to evaluate
 * @param {string} [pathObject.base] - File name including extension (if any)
 * @param {string} [pathObject.dir] - Directory name or full directory path
 * @param {string} [pathObject.ext] - File extension (if any)
 * @param {string} [pathObject.name] - File name without extension (if any)
 * @param {string} [pathObject.root] - Root of path
 * @return {string} Path string
 * @throws {TypeError} If `pathObject` is not an object
 */
const format = (pathObject: FormatInputPathObject): string => {
  validateObject(pathObject, 'pathObject')

  // ensure path components meet posix standards
  pathObject.base && (pathObject.base = ensurePosix(pathObject.base))
  pathObject.dir && (pathObject.dir = ensurePosix(pathObject.dir))
  pathObject.ext && (pathObject.ext = ensurePosix(pathObject.ext))
  pathObject.name && (pathObject.name = ensurePosix(pathObject.name))
  pathObject.root && (pathObject.root = ensurePosix(pathObject.root))

  /**
   * File name including extension (if any).
   *
   * @const {string} base
   */
  const base: string =
    pathObject.base || `${pathObject.name ?? ''}${formatExt(pathObject.ext)}`

  /**
   * Directory name or full path.
   *
   * @const {string | undefined} dir
   */
  const dir: string | undefined = pathObject.dir || pathObject.root

  return !dir
    ? base
    : dir === pathObject.root
    ? `${dir}${base}`
    : `${dir}${sep}${base}`
}

export default format
