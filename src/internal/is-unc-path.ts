/**
 * @file Internal - isUncPath
 * @module pathe/internal/isUncPath
 */

import { UNC_PATH_REGEX } from './constants'
import validateString from './validate-string'

/**
 * Determines if a path is a universal naming convention (UNC) path.
 *
 * @see https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
 *
 * @param {string} path - Path to evaluate
 * @return {boolean} `true` if path is UNC path
 */
const isUncPath = (path: string): boolean => {
  return validateString(path, 'path') && UNC_PATH_REGEX.test(path)
}

export default isUncPath
