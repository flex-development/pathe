/**
 * @file Internal - ensurePosix
 * @module pathe/internal/ensurePosix
 */

import delimiter from '#src/lib/delimiter'
import sep from '#src/lib/sep'
import validateString from './validate-string'

/**
 * Ensures `path` meets POSIX standards.
 *
 * This includes:
 *
 * - Converting Windows-style path delimiters (`;`) to POSIX (`:`)
 * - Converting Windows-style path segment separators (`\`) to POSIX (`/`)
 * - Consolidating duplicate path segment separators (occurs when an escaped
 *   Windows-style separator (`\\`) is converted to POSIX)
 *
 * @see https://nodejs.org/api/path.html#windows-vs-posix
 * @see https://nodejs.org/api/path.html#pathdelimiter
 * @see https://nodejs.org/api/path.html#pathsep
 *
 * @param {string} [path=''] - Path to normalize
 * @return {string} `path` normalized
 */
const ensurePosix = (path: string = ''): string => {
  validateString(path, 'path')

  return path
    .replace(/;/g, delimiter) // convert path delimiters
    .replace(/\\/g, sep) // convert path segment separators
    .replace(new RegExp(`(?<!^)\\${sep}+`), sep) // consolidate separators
}

export default ensurePosix
