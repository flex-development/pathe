/**
 * @file parse
 * @module pathe/lib/parse
 */

import type { ParsedPath } from '#src/interfaces'
import { DRIVE_PATH_REGEX, UNC_PATH_REGEX } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isDrivePath from '#src/internal/is-drive-path'
import isUncPath from '#src/internal/is-unc-path'
import validateString from '#src/internal/validate-string'
import removeExt from '#src/utils/remove-ext'
import basename from './basename'
import dirname from './dirname'
import extname from './extname'
import isAbsolute from './is-absolute'
import sep from './sep'

/**
 * Returns an object whose properties represent significant elements of the
 * given `path`. Trailing directory [separators][1] are ignored.
 *
 * **Note**: Unlike in Node.js, `pathe.parse(path).dir === pathe.dirname(path)`
 * when `path` is a non-empty string. See [`nodejs/node#18655`][3] for details.
 *
 * [1]: {@link ./sep.ts}
 * [2]: {@link ./dirname.ts}
 * [3]: https://github.com/nodejs/node/issues/18655
 *
 * @param {string} path - Path to evaluate
 * @return {ParsedPath} Object representing significant elements of `path`
 * @throws {TypeError} If `path` is not a string
 */
const parse = (path: string): ParsedPath => {
  validateString(path, 'path')

  // ensure path meets posix standards
  path = ensurePosix(path)

  /**
   * Parsed path object.
   *
   * @const {ParsedPath} ret
   */
  const ret: ParsedPath = { base: '', dir: '', ext: '', name: '', root: '' }

  // exit early if path is empty string
  if (path.length === 0) return ret

  ret.base = basename(path)
  ret.dir = dirname(path)
  ret.ext = extname(path)
  ret.name = removeExt(ret.base, ret.ext)
  ret.root = isUncPath(path)
    ? UNC_PATH_REGEX.exec(path)![1]!
    : isDrivePath(path)
    ? DRIVE_PATH_REGEX.exec(path)![1]!
    : isAbsolute(path)
    ? sep
    : ''

  return ret
}

export default parse
