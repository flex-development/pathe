/**
 * @file cwd
 * @module pathe/lib/cwd
 */

import process from '#internal/process'

/**
 * Get the path to the current working directory.
 *
 * @category
 *  utils
 *
 * @return {string}
 *  Absolute path to current working directory
 */
function cwd(): string {
  return process.cwd()
}

export default cwd
