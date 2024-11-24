/**
 * @file extnames
 * @module pathe/lib/extnames
 */

import validateURLString from '#internal/validate-url-string'
import extname from '#lib/extname'
import toPath from '#lib/to-path'
import toPosix from '#lib/to-posix'
import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Get a list of file extensions for `input`.
 *
 * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a `URL`,
 * > it will be converted to a path using {@linkcode toPath}.
 *
 * @see {@linkcode Ext}
 * @see {@linkcode extname}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @return {Ext[]}
 *  List of extensions
 */
function extnames(this: void, input: URL | string): Ext[] {
  validateURLString(input, 'input')

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
  let subpath: string = toPosix(toPath(input))

  while (true) {
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
