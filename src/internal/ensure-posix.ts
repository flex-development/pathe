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
 *
 * @see https://nodejs.org/api/path.html#windows-vs-posix
 * @see https://nodejs.org/api/path.html#pathdelimiter
 * @see https://nodejs.org/api/path.html#pathsep
 *
 * @param {string} [path=''] - Path to ensure
 * @return {string} POSIX-compliant `path`
 * @throws {TypeError} If `path` is not a string
 */
const ensurePosix = (path: string = ''): string => {
  validateString(path, 'path')
  return path.replace(/;/g, delimiter).replace(/\\/g, sep)
}

export default ensurePosix
