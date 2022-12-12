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
 * @param {boolean} [exact=true] - Check for exactly two leading separators
 * @return {boolean} `true` if path is UNC path
 * @throws {TypeError} If `path` is not a string
 */
const isUncPath = (path: string, exact: boolean = true): boolean => {
  validateString(path, 'path')
  exact = exact ? /^[/\\]{2}[^/\\]/.test(path) : true
  return UNC_PATH_REGEX.test(path) && exact
}

export default isUncPath
