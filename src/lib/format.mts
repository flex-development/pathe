/**
 * @file format
 * @module pathe/lib/format
 */

import validateObject from '#internal/validate-object'
import formatExt from '#lib/format-ext'
import type parse from '#lib/parse'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import type { FormatInputPathObject } from '@flex-development/pathe'

/**
 * Get a path string from an object.
 *
 * This is the opposite of {@linkcode parse}.
 *
 * When adding properties to `pathObject`, there are combinations where one
 * property has priority over another:
 *
 * - `pathObject.root` is ignored if `pathObject.dir` is provided
 * - `pathObject.ext` and `pathObject.name` are ignored if `pathObject.base`
 *   exists
 *
 * @see {@linkcode FormatInputPathObject}
 *
 * @category
 *  core
 *
 * @this {void}
 *
 * @param {FormatInputPathObject | null | undefined} pathObject
 *  The path object to handle
 * @param {string | null | undefined} [pathObject.base]
 *  File name including extension (if any)
 * @param {string | null | undefined} [pathObject.dir]
 *  Directory name or full directory path
 * @param {string | null | undefined} [pathObject.ext]
 *  File extension (if any)
 * @param {string | null | undefined} [pathObject.name]
 *  File name without extension (if any)
 * @param {string | null | undefined} [pathObject.root]
 *  Root of path
 * @return {string}
 *  Path string
 */
function format(
  this: void,
  pathObject: FormatInputPathObject | null | undefined
): string {
  if (pathObject !== null && pathObject !== undefined) {
    validateObject(pathObject, 'pathObject')

    /**
     * File name including extension (if any).
     *
     * @const {string} base
     */
    const base: string = pathObject.base ||
      `${pathObject.name ?? ''}${formatExt(pathObject.ext)}`

    /**
     * Directory name or full path.
     *
     * @const {string | null | undefined} dir
     */
    const dir: string | null | undefined = pathObject.dir ?? pathObject.root

    return toPosix(
      !dir
        ? base
        : dir === pathObject.root
        ? `${dir}${base}`
        : `${dir}${sep}${base}`
    )
  }

  return ''
}

export default format
