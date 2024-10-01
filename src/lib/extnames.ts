/**
 * @file extnames
 * @module pathe/lib/extnames
 */

import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import extname from '#lib/extname'
import toPosix from '#lib/to-posix'
import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Get a list of file extensions for `path`.
 *
 * @see {@linkcode Ext}
 * @see {@linkcode extname}
 *
 * @param {string} path
 *  Path to handle
 * @return {Ext[]}
 *  List of extensions
 */
function extnames(path: string): Ext[] {
  validateString(path, 'path')

  /**
   * List of extensions.
   *
   * @const {Ext[]} extensions
   */
  const extensions: Ext[] = []

  /**
   * Current path.
   *
   * @var {string} subpath
   */
  let subpath: string = toPosix(path)

  while (subpath.includes(dot)) {
    /**
     * Current extension.
     *
     * @const {EmptyString | Ext} ext
     */
    const ext: EmptyString | Ext = extname(subpath)

    if (ext === '') break

    extensions.unshift(ext)
    subpath = subpath.slice(0, subpath.lastIndexOf(ext))
  }

  return extensions
}

export default extnames
