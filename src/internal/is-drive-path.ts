/**
 * @file Internal - isDrivePath
 * @module pathe/internal/isDrivePath
 */

import { DRIVE_PATH_REGEX } from './constants'
import validateString from './validate-string'

/**
 * Determines if a path starts with a disk designator.
 *
 * [1]: https://computerhope.com/jargon/d/drivelet.htm
 *
 * @see https://docs.microsoft.com/windows/win32/fileio/naming-a-file
 *
 * @example
 *  isDrivePath('C:\\temp\\myfile.html') // true
 * @example
 *  isDrivePath('/tmp/myfile.html') // false
 * @example
 *  isDrivePath('myfile.html') // false
 *
 * @param {string} path - Path to evaluate
 * @return {boolean} `true` if path starts with [drive letter][1]
 */
const isDrivePath = (path: string): boolean => {
  return validateString(path, 'path') && DRIVE_PATH_REGEX.test(path)
}

export default isDrivePath
