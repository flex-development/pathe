/**
 * @file cwd
 * @module pathe/lib/cwd
 */

import process from '#internal/process'
import toPosix from '#lib/to-posix'

/**
 * Get the path to the current working directory.
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @return {string}
 *  Absolute path to current working directory
 */
function cwd(this: void): string {
  return toPosix(process.cwd())
}

export default cwd
